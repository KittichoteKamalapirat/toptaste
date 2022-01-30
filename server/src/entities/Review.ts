import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

import { User } from "./User";

@Entity()
@ObjectType()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string;

  @Field(() => Int)
  @Column()
  score: number;

  // relationship with user

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user: User;

  @Field()
  @Column()
  userId: number;

  // relationship with Post (Restaurant)

  @ManyToOne(() => Post, (post) => post.reviews, {
    onDelete: "CASCADE",
  })
  @Field(() => Post)
  post: Post;

  @Field(() => Int)
  @Column()
  postId: number;

  @Field(() => String)
  @Column()
  visitedDate: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
