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
export class Investor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  displayName!: string;

  @Column({ nullable: true })
  contactEmail!: string;

  @Column({ nullable: true })
  shortDesc!: string;

  @Column({ nullable: true })
  iType!: string;

  @Column({ nullable: true })
  investedIn!: string;

  @Column({
    default:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2Fdef2%20(1).png?alt=media&token=96943b7d-56e5-40a3-a0ac-2110e420781e",
  })
  pfpURL!: string;

  @OneToOne(() => User, (user) => user.investor, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  userId!: number;

  @Column({ default: false })
  approved!: boolean;
}

