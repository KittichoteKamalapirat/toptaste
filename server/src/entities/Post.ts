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

  @OneToMany((type) => Review, (review) => review.post, { cascade: true })
  reviews: Review[];

  @Column({ type: "int", default: 0 })
  @Field(() => Int)
  reviewsSum: number;

  @Column({ type: "int", default: 0 })
  @Field(() => Int)
  reviewsCounter: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
