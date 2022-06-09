import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from ".";

@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  chatId!: string;

  @Column({ default: false })
  investorUnread!: string;

  @Column({ default: false })
  startupUnread!: string;

  @Column()
  sUserId!: number;

  @Column()
  iUserId!: number;
}

