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
export class Startup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  displayName!: string;

  @Column()
  website!: string;

  @OneToOne(() => User, (user) => user.startup, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  userId!: number;

  @Column({ nullable: true })
  contactEmail!: string;

  @Column({ nullable: true })
  shortDesc!: string;

  @Column({ default: 0, nullable: true })
  amountRaised!: string;

  @Column({ nullable: true })
  ytURL!: string;

  @Column({
    default:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2Fdownload%20(3).png?alt=media&token=c7e3a93d-e70e-4595-891c-bfab96418133",
  })
  logoURL!: string;

  @Column({ default: 0 })
  revenue!: string;
  @Column({ default: 0 })
  profit!: string;
}
