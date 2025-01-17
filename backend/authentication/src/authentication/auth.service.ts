import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/database/user.entity';
import { hash, compare } from 'bcryptjs';
import { CreateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async register(
    email: string,
    password: string,
    nickname: string,
  ): Promise<CreateUserDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('Email is already in use');
    }
    if (!password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      nickname,
    });

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
