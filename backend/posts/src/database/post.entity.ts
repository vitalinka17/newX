import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ type: 'varchar', length: 280 })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  //TODO: change to a real RELATION
  @PrimaryGeneratedColumn()
  authorId: number;

  // @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'authorId' })
  // author: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
}
