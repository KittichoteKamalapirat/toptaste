import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Root,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
  Int,
  Args,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "../types";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, __prod__ } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection } from "typeorm";
import { isAdmin } from "../middlware/isAdmin";
import { isAuth } from "../middlware/isAuth";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
// For User
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  // @FieldResolver(() => String)
  // email(@Root() user: User, @Ctx() { req }: MyContext) {
  //   if (user.id === req.session.userId) {
  //     // This is the current user and its ok to show them their own emails
  //     return user.email;
  //   }
  //   // current user watns to see someone elses email
  //   return "";
  // }
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("newPassword") newPassword: string,
    @Arg("token") token: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword", //match the frontend Field
            message: "Length must be greater than 2",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      // this means 1) token expired 2)token invalid (unlikely)
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }
    user.password = await argon2.hash(newPassword);
    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      }
    );
    redis.del(key); //so that token can be used once
    //  log in user after change password
    req.session.userId = user.id;

    return { user };
  }
  // └ return UserResponse so we can login user after changing the password

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // do nothing and don't tell user anything
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); //3days

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`
    );
    return true;
  }

  //get all user
  @UseMiddleware(isAdmin)
  @Query(() => [User])
  async users(): Promise<User[] | undefined> {
    const users = await User.find({
      order: {
        createdAt: "DESC",
      },
    });
    return users;
  }

  // get a single user
  @Query(() => User)
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  //get current user
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    //Destructure the parameter array to req
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(data);
    if (errors) {
      //if no error, return null as defined
      return { errors };
    }

    const hash = await argon2.hash(data.password);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          { username: data.username, email: data.email, password: hash },
        ])
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (error) {
      console.log("err", error);
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }
    // automatically logged in after register
    // set a cookie on the user
    req.session.userId = user.id;
    return { user: user };
  }
  //admin can create a user
  //no need to login after create
  @UseMiddleware(isAdmin)
  @Mutation(() => UserResponse)
  async createUser(
    @Arg("data") data: UsernamePasswordInput
  ): Promise<UserResponse> {
    const errors = validateRegister(data);
    if (errors) {
      return { errors };
    }
    const hash = await argon2.hash(data.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          { username: data.username, email: data.email, password: hash },
        ])
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    return { user: user };
  }

  //login
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }

      // ben did{ where: {username: usernameOrEmail }}
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "The username or email does not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    console.log(req.session);
    return { user: user };
  }

  //log out
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      //remove the session in redis`
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME, {
          // maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
          httpOnly: true,
          sameSite: "lax",
          secure: __prod__,
        });
        if (err) {
          // console.log(err);
          resolve(false);
          return;
          //return so it doesn't go on
        }
        // console.log(res.cookie);
        console.log("logged out");
        resolve(true);
      });
    });
  }

  //update user
  // only admin can
  @UseMiddleware(isAdmin)
  @Mutation(() => UserResponse)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: UsernamePasswordInput
  ): Promise<UserResponse> {
    let user;
    try {
      const newPassword = await argon2.hash(data.password);

      const result = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          username: data.username,
          email: data.email,
          password: newPassword,
        })
        .where("id = :id", {
          id: id,
        })
        .returning("*")
        .execute();
      user = result.raw[0] as User;
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }
    return { user: user };
  }

  //delete user
  // admin can delete any users
  @UseMiddleware(isAdmin)
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean | Error> {
    try {
      await User.delete(id);

      return true;
    } catch (error) {
      console.log(error.message);
      return new Error("cannot delete this user");
    }
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => Boolean)
  async makeAdmin(
    @Arg("id", () => Int) id: number,
    @Arg("beAdmin") beAdmin: boolean,
    @Ctx() { req }: MyContext
  ): Promise<boolean | Error> {
    if (req.session.userId === id) {
      return new Error("Cannot update yourself");
    }
    try {
      await User.update(
        { id: id },
        {
          isAdmin: beAdmin,
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  }
}
