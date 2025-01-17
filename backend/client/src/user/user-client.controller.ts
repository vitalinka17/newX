import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { UserClientService } from './user-client.service';

@Controller('users')
export class UserClientController {
  constructor(private readonly userClientService: UserClientService) {}

  @Post()
  async createUser(
    @Body()
    payload: {
      username: string;
      displayName: string;
      password: string;
      email: string;
    },
  ) {
    return this.userClientService.createUser(payload);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userClientService.findUserById(id);
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userClientService.findUserByUsername(username);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() payload: { email?: string; username?: string },
  ) {
    return this.userClientService.updateUser({ id, ...payload });
  }

  @Post('follow')
  async followUser(@Body() payload: { userId: string; targetUserId: string }) {
    return this.userClientService.followUser(payload);
  }

  @Post('unfollow')
  async unfollowUser(
    @Body() payload: { userId: string; targetUserId: string },
  ) {
    return this.userClientService.unfollowUser(payload);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id') id: string) {
    return this.userClientService.getFollowers(id);
  }

  @Get(':id/following')
  async getFollowing(@Param('id') id: string) {
    return this.userClientService.getFollowing(id);
  }
}
