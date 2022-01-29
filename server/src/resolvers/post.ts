import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { isAdmin } from "../middlware/isAdmin";
import { IMG_PLACEHOLDER } from "../constants";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field()
  url?: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  //trim textg
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50);
  }

  //loader
  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  // get posts
  //any users can
  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    let cursorIndex = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection().query(
      `
      select p.*, COALESCE("reviewsSum"/NULLIF("reviewsCounter", 0),0 ) AS "reviewAvg"
      from post p
      ${cursor ? `where p."createdAt" < $2` : ""}
      order by "reviewAvg" DESC
      limit $1
      `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }
  //get a single post
  //any users can
  @Query(() => Post, { nullable: true })
  async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  // craete a post
  //only admin
  @Mutation(() => Post)
  @UseMiddleware(isAdmin)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (input.url === "") {
      input.url = IMG_PLACEHOLDER;
    }
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  // update a post
  //only admin
  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAdmin)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    if (input.url === "") {
      input.url = IMG_PLACEHOLDER;
    }
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ ...input })
      .where('id = :id and "creatorId" = :creatorId', {
        id: id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  //delete post
  //only admin
  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Post.delete({ id: id, creatorId: req.session.userId });
    return true;
  }

  //review

  //review

  @FieldResolver(() => Float)
  reviewAvg(@Root() post: Post): number {
    if (post.reviewsCounter === 0 || post.reviewsSum === 0) {
      return 0;
    }
    return post.reviewsSum / post.reviewsCounter;
  }
}
