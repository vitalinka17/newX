import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthProvider } from 'src/providers/auth.provider';

@Injectable()
export class AuthClientService {
  constructor(@Inject(AuthProvider.provide) private authService: ClientProxy) {}

  async registerUser(user: {
    email: string;
    password: string;
    nickname: string;
  }) {
    return this.authService.send({ cmd: 'register_user' }, user).toPromise();
  }

  async validateUser(user: { email: string; password: string }) {
    return this.authService.send({ cmd: 'validate_user' }, user).toPromise();
  }

  async loginUser(user: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    return this.authService.send({ cmd: 'login_user' }, user).toPromise();
  }
}
