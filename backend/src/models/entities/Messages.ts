import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@Unique(["sUserId", "iUserId"])
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  chatId!: string;

  @Column({ default: false })
  investorUnread!: boolean;

  @Column({ default: false })
  startupUnread!: boolean;

  @Column()
  sUserId!: number;

  @Column()
  iUserId!: number;

  @UpdateDateColumn()
  updatedAt: Date;
}

