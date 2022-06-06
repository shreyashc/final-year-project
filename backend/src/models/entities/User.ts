import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Investor } from "./Inverstor";
import { Startup } from "./Startup";
import { Upvote } from "./Upvote";
import { Visitor } from "./Visitor";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!:
    | "admin"
    | "investor"
    | "visitor"
    | "incubator"
    | "jobseeker"
    | "startup";

  @OneToOne(() => Visitor, (visitor) => visitor.user)
  visitor: Visitor;

  @OneToOne(() => Investor, (innverstor) => innverstor.user)
  investor: Investor;

  @OneToOne(() => Startup, (startup) => startup.user)
  startup: Startup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];
}
