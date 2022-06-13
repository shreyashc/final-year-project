import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

