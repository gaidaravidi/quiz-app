import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService) {
  }

  async register(data: RegisterDTO) {
    try {
      const user = this.userRepo.create(data);
      await user.save();
      return user.toJson();
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('Email is already taken');

      throw new InternalServerErrorException();
    }
  }

  async login(data: LoginDTO) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: data.email },
      });
      if (user && (await user.comparePassword(data.password))) {
        const token = this.jwtService.sign({ id: user.id });
        return { user: user.toJson(), token }
      } else
        throw new UnauthorizedException('Invalid credentials');
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');

    }
  }
}
