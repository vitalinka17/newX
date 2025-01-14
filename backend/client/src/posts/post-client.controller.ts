import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { PostClientService } from './post-client.service';

@Controller('post')
export class PostClientController {
  constructor(private readonly postClientService: PostClientService) {}

  @HttpCode(200)
  @Get()
  async getAllPosts() {
    return this.postClientService.findAllPosts();
  }

  @HttpCode(200)
  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postClientService.findPostById(id);
  }

  @HttpCode(201)
  @Post()
  async createPost(@Body() post: { title: string; content: string }) {
    return this.postClientService.createPost(post);
  }

  @HttpCode(200)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() post: { title: string; content: string },
  ) {
    return this.postClientService.updatePost(id, post);
  }

  @HttpCode(204)
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postClientService.deletePost(id);
  }
}
