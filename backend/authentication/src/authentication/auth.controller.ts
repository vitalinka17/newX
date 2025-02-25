import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from 'src/database/user.entity';
import { CreateUserDto, ValidateUserDto } from './user.dto';
import axios from 'axios';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  onModuleInit() {
    this.userClient.connect();
  }

  @MessagePattern({ cmd: 'register_user' })
  async register(@Payload() payload: CreateUserDto): Promise<any> {
    const { email, password, nickname } = payload;

    console.log('Registering user:', payload);

    try {
      const registeredUser = await this.authService.register(
        email,
        password,
        nickname,
      );
      console.log('User registered:', registeredUser);

      // Send API request using Axios
      const response = await axios.post(
        'http://host.docker.internal:3000/users',
        {
          username: nickname,
          email,
          displayName: nickname,
          password,
        },
      );

      console.log('API Response:', response.data);
      return registeredUser;
    } catch (error) {
      console.error('Error in register function:', error);
      throw new Error(error.message || 'Registration failed');
    }
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
