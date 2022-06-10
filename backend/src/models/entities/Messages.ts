import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Investor } from "./Inverstor";
import { Startup } from "./Startup";

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

  @ManyToMany(() => Investor,(inverstor) => inverstor.messages)
  investor!: Investor
  
  @ManyToMany(() => Startup)
  @JoinTable()
  startup!:Startup

  @Column()
  sUserId!: number;

  @Column()
  iUserId!: number;
}

