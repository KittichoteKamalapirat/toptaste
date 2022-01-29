import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { createQueryBuilder, getConnection } from "typeorm";
import { Post } from "../entities/Post";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import { isAdmin } from "../middlware/isAdmin";
import { isAuth } from "../middlware/isAuth";
import { MyContext } from "../types";

@InputType()
class ReviewInput {
  @Field(() => Int)
  score: number;
  @Field()
  comment: string;
  @Field(() => Date)
  visitedDate: Date;
}

@Resolver(Review)
export class ReviewResolver {
  //create a review
  //regular users can
  @UseMiddleware(isAuth)
  @Mutation(() => Review || Error)
  async createReview(
    @Arg("input", () => ReviewInput) input: ReviewInput,
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ): Promise<Review | Error> {
    try {
      //User can only review one post one time
      //   const existingReview = await Review.find({
      //     where: {
      //       postId: postId,
      //       userId: req.session.userId,
      //     },
      //   });

      //   if (existingReview.length > 0) {
      //     return new Error("You have already reviewed this product");
      //   }

      //input has to be within 1-5
      if (input.score > 5 || input.score < 1) {
        return new Error("Invalid score input");
      }

      const post = await Post.findOne({ id: postId });
      if (post) {
        Post.update(
          { id: postId },
          {
            reviewsCounter: post.reviewsCounter + 1,
            reviewsSum: post.reviewsSum + input.score,
          }
        );
      } else {
        return new Error("cannot find the post");
      }

      const review = await Review.create({
        score: input.score,
        comment: input.comment,
        visitedDate: new Date(input.visitedDate),
        userId: req.session.userId,
        postId: postId,
      }).save();

      return review;
    } catch (error) {
      console.log(error);
      return new Error("Cannot create review");
    }
  }

  //get all reviews in the database
  @UseMiddleware(isAuth)
  @Query(() => [Review])
  async allReviews(): Promise<Review[] | Error> {
    try {
      return Review.find({
        order: {
          visitedDate: "DESC",
        },
      });
    } catch (error) {
      console.log(error);
      return new Error("Cannot get all the reviews ");
    }
  }

  //get one review
  @UseMiddleware(isAuth)
  @Query(() => Review)
  async review(
    @Arg("id", () => Int) id: number
  ): Promise<Review | Error | undefined> {
    try {
      return Review.findOne(id);
    } catch (error) {
      console.log(error);
      return new Error("Cannot get the review for this post");
    }
  }

  //get all reviews of a single post
  @UseMiddleware(isAuth)
  @Query(() => [Review])
  async reviews(@Arg("postId", () => Int) postId: number) {
    try {
      return Review.find({
        where: { postId },
        relations: ["user", "post"],
      });
    } catch (error) {
      console.log(error);
      return new Error("Cannot get reviews for this post");
    }
  }

  //Only admin can update
  @UseMiddleware(isAdmin)
  @Mutation(() => Review || Error)
  async updateReview(
    // @Arg("postId", () => Int) postId: number,
    @Arg("input", () => ReviewInput) input: ReviewInput,
    @Arg("postId", () => Int) postId: number,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Review | Error> {
    try {
      //input has to be within 1-5

      if (input.score > 5 || input.score < 1) {
        return new Error("Invalid score input");
      }

      //need to add userId: req.session.userId and and change to isAuth middle where if the owner can edit
      const currentReview = await Review.findOne({
        where: { id: id },
      });

      if (!currentReview) {
        return new Error("Cannot find requested resource");
      }
      input.visitedDate = new Date(input.visitedDate);
      const result = await getConnection()
        .createQueryBuilder()
        .update(Review)
        .set(input)
        .where("id = :id", {
          id: id,
        })
        .returning("*")
        .execute();

      const post = await Post.findOne({ id: postId });
      if (post) {
        Post.update(
          { id: postId },
          {
            //same review counter
            reviewsSum: post.reviewsSum + input.score - currentReview?.score!,
          }
        );
      } else {
        return new Error("cannot find the post");
      }
      return result.raw[0];
    } catch (error) {
      console.log(error);
      return new Error("Cannot update this review");
    }
  }

  //only admin can delete
  @UseMiddleware(isAdmin)
  @Mutation(() => Boolean)
  async deleteReview(
    @Arg("id", () => Int) id: number,
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean | Error> {
    try {
      //won't do anything if wrong postId or userId
      //   Have to update 2 tables which are Review and the Post

      //update score on post
      const currentReview = await Review.findOne(id);
      const post = await Post.findOne({ id: postId });

      console.log({ post });
      console.log({ currentReview });

      //   update Review
      await Review.delete(id);

      if (post) {
        await Post.update(
          { id: postId },
          {
            reviewsCounter: post?.reviewsCounter! - 1,
            reviewsSum: post?.reviewsSum! - currentReview?.score!,
          }
        );
        return true;
      } else {
        return new Error("Cannot find the post");
      }
    } catch (error) {
      console.log(error);
      return new Error("Cannot delete this review");
    }
  }

  // latest review of a restaurant
  @Query(() => Review)
  async latestReview(
    @Arg("postId", () => Int) postId: number
  ): Promise<Review | Error> {
    try {
      const result = await getConnection().query(
        `
            select r.*
            from review r
            where r."postId" = ${postId}
            order by r."visitedDate" DESC, r."score" DESC
            limit 1
            `
      );
      const latestReview = result[0] as Review;

      return latestReview;
    } catch (error) {
      return new Error("cannot find the review");
    }
  }

  @Query(() => Review)
  async bestReview(
    @Arg("postId", () => Int) postId: number
  ): Promise<Review | Error> {
    try {
      const result = await getConnection().query(
        `
            select r.*
            from review r
            where r."postId" = ${postId}
            order by r."score" DESC, r."visitedDate" DESC
            limit 1
            `
      );
      const bestReview = result[0] as Review;

      return bestReview;
    } catch (error) {
      return new Error("cannot find the review");
    }
  }

  @Query(() => Review)
  async worstReview(
    @Arg("postId", () => Int) postId: number
  ): Promise<Review | Error> {
    try {
      const result = await getConnection().query(
        `
            select r.*
            from review r
            where r."postId" = ${postId}
            order by r."score" ASC,r."visitedDate" DESC
            limit 1
            `
      );
      const worstReview = result[0] as Review;

      return worstReview;
    } catch (error) {
      return new Error("cannot find the review");
    }
  }
}
