import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Review } from "./Review";
import { Upvote } from "./Upvote";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: true })
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field()
  text: string;

  // @Column({ type: "int", default: 0 })
  // @Field()
  // points: number;

  // @Field(() => Int, { nullable: true })
  // voteStatus: number | null; //willl be 1 or -1, this is used to check the status of this post for a user

  @Column({ nullable: true })
  @Field({ nullable: true })
  url: string;

  @Column()
  @Field()
  // @Field()
  creatorId: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.posts)
  creator: User;

  @OneToMany((type) => Review, (review) => review.post)
  reviews: Review[];

  @Column({ type: "int", default: 0 })
  @Field(() => Int)
  reviewsSum: number;

  @Column({ type: "int", default: 0 })
  @Field(() => Int)
  reviewsCounter: number;

  // @OneToMany((type) => Upvote, (upvote) => upvote.post)
  // upvotes: Upvote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
