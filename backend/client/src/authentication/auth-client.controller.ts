import { Controller, Post, Body } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';

@Controller('auth')
export class AuthClientController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Post('register')
  async registerUser(
    @Body() user: { email: string; password: string; nickname: string },
  ) {
    return this.authClientService.registerUser(user);
  }

  @Post('validate')
  async validateUser(@Body() user: { email: string; password: string }) {
    return this.authClientService.validateUser(user);
  }

  @Post('login')
  async loginUser(@Body() user: { email: string; password: string }) {
    return this.authClientService.loginUser(user);
  }
}
