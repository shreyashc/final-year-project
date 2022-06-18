import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class DRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  roomId!: string;

  @Column()
  roomName!: string;

  @Column()
  createorUserId!: number;

  @UpdateDateColumn()
  updatedAt: Date;
}

