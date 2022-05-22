import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Startup } from "./Startup";
import { Visitor } from "./Visitor";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password?: string;

  @Column()
  role!:
    | "admin"
    | "investor"
    | "visitor"
    | "incubator"
    | "jobseeker"
    | "startup";

  @OneToOne(() => Visitor, (visitor) => visitor.user)
  visitor: Visitor;

  @OneToOne(() => Startup, (startup) => startup.user)
  startup: Startup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    delete this.password;
    return this;
  }
}
