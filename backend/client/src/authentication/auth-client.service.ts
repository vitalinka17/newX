import { Injectable } from '@nestjs/common';
import { BaseClientService } from '../client/base-client.service';

@Injectable()
export class AuthClientService extends BaseClientService {
  async registerUser(user: {
    email: string;
    password: string;
    nickname: string;
  }) {
    const client = this.getClient('AUTH_SERVICE');
    return client.send({ cmd: 'register_user' }, user).toPromise();
  }

  async validateUser(user: { email: string; password: string }) {
    const client = this.getClient('AUTH_SERVICE');
    return client.send({ cmd: 'validate_user' }, user).toPromise();
  }

  async loginUser(user: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    const client = this.getClient('AUTH_SERVICE');
    return client.send({ cmd: 'login_user' }, user).toPromise();
  }
}
