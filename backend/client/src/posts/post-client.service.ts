import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostProvider } from 'src/providers/post.provider';

@Injectable()
export class PostClientService {
  constructor(@Inject(PostProvider.provide) private postService: ClientProxy) {}

  async findAllPosts() {
    return this.postService.send({ cmd: 'find_all_posts' }, {}).toPromise();
  }

  async findPostById(id: number) {
    return this.postService.send({ cmd: 'find_post_by_id' }, id).toPromise();
  }

  async createPost(post: { title: string; content: string }) {
    return this.postService.send({ cmd: 'create_post' }, post).toPromise();
  }

  async updatePost(id: number, post: { title: string; content: string }) {
    return this.postService
      .send({ cmd: 'update_post' }, { id, data: post })
      .toPromise();
  }

  async deletePost(id: number) {
    return this.postService.send({ cmd: 'delete_post' }, id).toPromise();
  }
}
