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
export class JobSeeker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  displayName!: string;

  @Column({ nullable: true })
  about!: string;

  @Column({ nullable: true })
  education!: string;

  @Column({ nullable: true })
  skills!: string;

  @Column({
    default:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2Fdef2%20(1).png?alt=media&token=96943b7d-56e5-40a3-a0ac-2110e420781e",
  })
  pfpURL!: string;

  @OneToOne(() => User, (user) => user.jobseeker, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  userId!: number;

  @Column({
    default: "",
  })
  resumePdfURL: string;
}

