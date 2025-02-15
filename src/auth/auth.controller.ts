import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersEntity } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthDto } from './dto/auth.dto';
import { AuthLocalGuard } from '../guards/auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  async register(@Body() data: CreateUserDto) {
    try {
      return await this.authService.register(data);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Dados Inválidos',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(@Body() data: AuthDto) {
    try {
      return await this.authService.login(data);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Dados Inválidos',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id_user')
  async profile(@Param('id_user') id_user: number): Promise<UsersEntity> {
    return await this.authService.profile(id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-profile/:id_client')
  async userProfile(
    @Param('id_client') id_client: number,
  ): Promise<UsersEntity> {
    const client = await this.authService.profile(id_client);
    delete client.password;
    return client;
  }
}
