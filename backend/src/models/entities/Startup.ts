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
}
