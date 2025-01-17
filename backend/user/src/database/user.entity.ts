import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  headerPhoto: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'user_followers',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'followerId' },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
