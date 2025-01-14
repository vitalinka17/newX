import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/post.entity';
import { CreatePostDto } from './posts.dto';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @Inject('POST_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.postRepository.findOne({ where: { postId: id } });
  }

  async create(postDto: CreatePostDto): Promise<PostEntity> {
    const newPost = this.postRepository.create({
      ...postDto,
      uuid: uuidv4(),
    });
    return this.postRepository.save(newPost);
  }

  async update(id: number, postDto: CreatePostDto): Promise<PostEntity> {
    const existingPost = await this.postRepository.findOne({ where: { postId: id } });
    if (!existingPost) {
      throw new Error(`Post with id ${id} not found`);
    }
    await this.postRepository.update({ postId: id, uuid: existingPost.uuid }, postDto);
    return this.postRepository.findOne({ where: { postId: id } });
  }

  async delete(id: number): Promise<void> {
    const existingPost = await this.postRepository.findOne({ where: { postId: id } });
    if (!existingPost) {
      throw new Error(`Post with id ${id} not found`);
    }

    await this.postRepository.delete({ postId: id, uuid: existingPost.uuid });
  }
}
