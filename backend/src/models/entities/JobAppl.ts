import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["appluserid", "sid", "title"])
export class JobAppl extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appluserid!: number;

  @Column()
  sid!: number;

  @Column()
  title!: string;

  @CreateDateColumn()
  createdAt: Date;
}

