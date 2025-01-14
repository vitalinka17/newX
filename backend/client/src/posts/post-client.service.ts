import { Injectable } from '@nestjs/common';
import { BaseClientService } from '../client/base-client.service';

@Injectable()
export class PostClientService extends BaseClientService {
  async findAllPosts() {
    const client = this.getClient('POST_SERVICE');
    return client.send({ cmd: 'find_all_posts' }, {}).toPromise();
  }

  async findPostById(id: number) {
    const client = this.getClient('POST_SERVICE');
    return client.send({ cmd: 'find_post_by_id' }, id).toPromise();
  }

  async createPost(post: { title: string; content: string }) {
    const client = this.getClient('POST_SERVICE');
    return client.send({ cmd: 'create_post' }, post).toPromise();
  }

  async updatePost(id: number, post: { title: string; content: string }) {
    const client = this.getClient('POST_SERVICE');
    return client.send({ cmd: 'update_post' }, { id, data: post }).toPromise();
  }

  async deletePost(id: number) {
    const client = this.getClient('POST_SERVICE');
    return client.send({ cmd: 'delete_post' }, id).toPromise();
  }
}
