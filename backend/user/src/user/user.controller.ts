import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, FollowUserDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user_profile' })
  async createUserProfile(
    @Payload() payload: { id: string; email: string; username: string },
  ) {
    await this.userService.createUser({
      username: payload.username,
      displayName: payload.username,
      email: payload.email,
    });
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @MessagePattern({ cmd: 'get_user_profile' })
  async getUserProfile(@Payload() userId: string) {
    return this.userService.findUserById(userId);
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(@Payload() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }

  @MessagePattern({ cmd: 'follow_user' })
  async followUser(@Payload() dto: FollowUserDto) {
    return this.userService.followUser(dto);
  }

  @MessagePattern({ cmd: 'unfollow_user' })
  async unfollowUser(@Payload() dto: FollowUserDto) {
    return this.userService.unfollowUser(dto);
  }
}
