import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Startup } from "./Startup";
import { User } from "./User";

@Entity()
export class Upvote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @PrimaryColumn()
  startupId: number;

  @ManyToOne(() => Startup, (post) => post.upvotes, {
    onDelete: "CASCADE",
  })
  startup: Startup;
}
