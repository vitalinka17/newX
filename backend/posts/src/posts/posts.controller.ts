import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './posts.service';
import { CreatePostDto } from './posts.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern({ cmd: 'find_all_posts' })
  async findAll() {
    return this.postService.findAll();
  }

  @MessagePattern({ cmd: 'find_post_by_id' })
  async findOne(@Payload() id: number) {
    return this.postService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_post' })
  async create(@Payload() postDto: CreatePostDto) {
    return this.postService.create(postDto);
  }

  @MessagePattern({ cmd: 'update_post' })
  async update(@Payload() payload: { id: number; data: CreatePostDto }) {
    const { id, data } = payload;
    return this.postService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete_post' })
  async delete(@Payload() id: number) {
    return this.postService.delete(id);
  }
}
