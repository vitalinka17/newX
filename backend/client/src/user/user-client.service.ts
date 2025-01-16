import { Injectable } from '@nestjs/common';
import { BaseClientService } from '../client/base-client.service';

@Injectable()
export class UserClientService extends BaseClientService {
  async findAllPosts() {
    const client = this.getClient('USER_SERVICE');
    return client.send({ cmd: 'find_all_posts' }, {}).toPromise();
  }
}
