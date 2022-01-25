import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";
import { Review } from "./Review";
import { Upvote } from "./Upvote";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  username!: string;

  @Column({ unique: true })
  @Field()
  email: string;

  //   Client can't query for password it will and hashed
  @Column()
  password: string;

  @Column({ default: false })
  @Field()
  isAdmin: boolean;

  @OneToMany((type) => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[];

  // @OneToMany((type) => Upvote, (upvote) => upvote.user)
  // upvotes: Upvote[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
