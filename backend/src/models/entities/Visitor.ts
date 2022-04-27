import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from ".";

@Entity()
export class Visitor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  displayName!: string;

  @OneToOne(() => User, (user) => user.visitor, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  userId!: number;
}
