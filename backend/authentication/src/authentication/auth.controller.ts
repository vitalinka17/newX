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
  async register(@Payload() payload: CreateUserDto): Promise<CreateUserDto> {
    const { email, password, nickname } = payload;

    await this.userClient
      .send(
        { cmd: 'create_user_profile' },
        {
          email,
          username: nickname,
        },
      )
      .toPromise();

    return this.authService.register(email, password, nickname);
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
