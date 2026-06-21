import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({ ...dto, password, address: dto.address ?? '' });

    return {
      message: 'Registration successful',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const matched = await bcrypt.compare(dto.password, user.password);
    if (!matched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: await this.jwtService.signAsync({ sub: user.id, email: user.email }),
      user: this.usersService.sanitize(user),
    };
  }

  async me(userId: string) {
    const user = await this.usersService.findById(userId);
    return this.usersService.sanitize(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.usersService.update(userId, dto);
    return {
      message: 'Profile updated successfully',
      user: this.usersService.sanitize(user),
    };
  }
}
