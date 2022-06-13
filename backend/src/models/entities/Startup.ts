import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from ".";
import { Upvote } from "./Upvote";

@Entity()
export class Startup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  displayName!: string;

  @Column()
  website!: string;

  @OneToOne(() => User, (user) => user.startup, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  userId!: number;


  @Column({ nullable: true })
  contactEmail!: string;

  @Column({ nullable: true })
  shortDesc!: string;

  @Column({ default: 0, nullable: true })
  amountRaised!: string;

  @Column({ nullable: true })
  ytURL!: string;

  @Column({ default: 0 })
  upvalue!: number;

  @OneToMany(() => Upvote, (updoot) => updoot.startup)
  upvotes: Upvote[];

   @Column({ default: false })
  isPremium!: boolean;

  @Column({
    default:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2Fdownload%20(3).png?alt=media&token=c7e3a93d-e70e-4595-891c-bfab96418133",
  })
  logoURL!: string;

  @Column({
    default: "",
  })
  pithPdfURL!: string;

  @Column({ default: 0 })
  revenue!: string;
  @Column({ default: 0 })
  profit!: string;

  @Column({ default: "Highlight 1" })
  h1!: string;
  @Column({ default: "Desc 1" })
  d1!: string;

  @Column({ default: "Highlight 2" })
  h2!: string;
  @Column({ default: "Desc 2" })
  d2!: string;

  @Column({ default: "Highlight 3" })
  h3!: string;
  @Column({ default: "Desc 3" })
  d3!: string;

  @Column({ default: "Person 1" })
  p1!: string;
  @Column({ default: "Bio 1" })
  b1!: string;
  @Column({ default: "Role 1" })
  r1!: string;

  @Column({ default: "Person 2" })
  p2!: string;
  @Column({ default: "Bio 2" })
  b2!: string;
  @Column({ default: "Role 2" })
  r2!: string;

  @Column({ default: "Person 3" })
  p3!: string;
  @Column({ default: "Bio 3" })
  b3!: string;
  @Column({ default: "Role 3" })
  r3!: string;
}
