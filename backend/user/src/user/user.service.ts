import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateUserDto, FollowUserDto, UpdateUserDto } from './user.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    const savedUser = await this.userRepository.save(user);

    this.client.emit('user_created', {
      id: savedUser.id,
      username: savedUser.username,
      email: dto.email,
    });

    return savedUser;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['followers', 'following'],
    });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateUser(dto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(dto.id, dto);
    const updatedUser = await this.userRepository.findOne({
      where: { id: dto.id },
    });

    // Emit an event for user update
    this.client.emit('user_updated', {
      id: updatedUser?.id,
      updatedFields: dto,
    });

    return updatedUser!;
  }

  async followUser(dto: FollowUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['following'],
    });
    const targetUser = await this.userRepository.findOne({
      where: { id: dto.targetUserId },
      relations: ['followers'],
    });

    if (user && targetUser) {
      user.following.push(targetUser);
      targetUser.followers.push(user);

      await this.userRepository.save(user);
      await this.userRepository.save(targetUser);

      // Emit an event for follow action
      this.client.emit('user_followed', {
        followerId: dto.userId,
        followedId: dto.targetUserId,
      });
    }
  }

  async unfollowUser(dto: FollowUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['following'],
    });
    const targetUser = await this.userRepository.findOne({
      where: { id: dto.targetUserId },
      relations: ['followers'],
    });

    if (user && targetUser) {
      user.following = user.following.filter(
        (follow) => follow.id !== targetUser.id,
      );
      targetUser.followers = targetUser.followers.filter(
        (follower) => follower.id !== user.id,
      );

      await this.userRepository.save(user);
      await this.userRepository.save(targetUser);

      // Emit an event for unfollow action
      this.client.emit('user_unfollowed', {
        unfollowerId: dto.userId,
        unfollowedId: dto.targetUserId,
      });
    }
  }

  async getFollowers(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['followers'],
    });
    return user ? user.followers : [];
  }

  async getFollowing(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
    return user ? user.following : [];
  }
}
