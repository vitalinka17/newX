import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from 'src/database/user.entity';
import { CreateUserDto, ValidateUserDto } from './user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'register_user' })
  async register(@Payload() payload: CreateUserDto): Promise<any> {
    const { email, password, nickname } = payload;

    const registeredUser = await this.authService.register(
      email,
      password,
      nickname,
    );

    this.userClient.emit('create_user_profile', {
      userId: registeredUser.id,
      username: nickname,
      email,
      displayName: nickname,
      password,
    });

    return registeredUser;
  }

  @MessagePattern({ cmd: 'validate_user' })
  async validateUser(
    @Payload() payload: ValidateUserDto,
  ): Promise<User | null> {
    const { email, password } = payload;
    return this.authService.validateUser(email, password);
  }

  @MessagePattern({ cmd: 'login_user' })
  async loginUser(
    @Payload() payload: ValidateUserDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = payload;
    return this.authService.login(email, password);
  }
}
