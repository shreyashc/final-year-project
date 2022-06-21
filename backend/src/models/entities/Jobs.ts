import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
   PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";


@Entity()
export class Jobs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description!: string;

  @Column()
  title!: string;

  @Column()
  experience!: string;

  @Column()
  salary!: string;

  @Column()
  applyby!: Date;

  @Column()
  userid!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
