import { Injectable } from '@nestjs/common';
import { BaseClientService } from '../client/base-client.service';

@Injectable()
export class UserClientService extends BaseClientService {
  async createUser(payload: {
    email: string;
    username: string;
    password: string;
  }) {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'create_user_profile' }, payload).toPromise();
  }

  async updateUser(payload: { id: string; email?: string; username?: string }) {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'update_user_profile' }, payload).toPromise();
  }

  async findUserById(userId: string) {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'find_user_by_id' }, { id: userId }).toPromise();
  }

  async findUserByUsername(username: string) {
    const client = this.getClient('USER_SERVICE');
    return client
      .send({ cmd: 'find_user_by_username' }, { username })
      .toPromise();
  }

  async followUser(payload: { userId: string; targetUserId: string }) {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'follow_user' }, payload).toPromise();
  }

  async unfollowUser(payload: { userId: string; targetUserId: string }) {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'unfollow_user' }, payload).toPromise();
  }

  async getFollowers(userId: string) {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'get_followers' }, { id: userId }).toPromise();
  }

  async getFollowing(userId: string) {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'get_following' }, { id: userId }).toPromise();
  }
}
