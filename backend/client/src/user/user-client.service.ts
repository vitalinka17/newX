import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserProvider } from 'src/providers/user.provider';

@Injectable()
export class UserClientService {
  constructor(@Inject(UserProvider.provide) private postService: ClientProxy) {}

  async createUser(payload: {
    userId: number;
    email: string;
    username: string;
    password: string;
  }) {
    return this.postService.send({ cmd: 'create_user' }, payload).toPromise();
  }

  async updateUser(payload: { id: number; email?: string; username?: string }) {
    return this.postService
      .send({ cmd: 'update_user_profile' }, payload)
      .toPromise();
  }

  async findUserById(userId: number) {
    return this.postService
      .send({ cmd: 'find_user_by_id' }, { id: userId })
      .toPromise();
  }

  async findUserByUsername(username: string) {
    return this.postService
      .send({ cmd: 'find_user_by_username' }, { username })
      .toPromise();
  }

  async followUser(payload: { userId: number; targetUserId: number }) {
    return this.postService.send({ cmd: 'follow_user' }, payload).toPromise();
  }

  async unfollowUser(payload: { userId: number; targetUserId: number }) {
    return this.postService.send({ cmd: 'unfollow_user' }, payload).toPromise();
  }

  async getFollowers(userId: number) {
    return this.postService
      .send({ cmd: 'get_followers' }, { id: userId })
      .toPromise();
  }

  async getFollowing(userId: number) {
    return this.postService
      .send({ cmd: 'get_following' }, { id: userId })
      .toPromise();
  }
}
