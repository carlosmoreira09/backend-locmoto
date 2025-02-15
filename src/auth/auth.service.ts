import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    const createUser = await this.userService.create(data);
    if (createUser) {
      return {
        status: 200,
        message: 'Cliente Cadastrado com sucesso',
      };
    }
  }

  async login(data: AuthDto) {
    const checkUserExists = await this.userService.validadeUserExist(
      data.username,
    );
    console.log(checkUserExists);
    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await this.comparePassword(
      data.password,
      checkUserExists.password,
    );
    console.log(checkPassword);
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    let accessToken: string;
    if (checkUserExists) {
      accessToken = this.generateJWT({
        id: checkUserExists.id_user,
        fullName: checkUserExists.fullName,
        role: checkUserExists.role,
      });
    }
    return {
      statusCode: 200,
      message: 'Logged',
      accessToken: accessToken,
    };
  }
  generateJWT(payload: any) {
    return this.jwtService.sign(payload);
  }

  async profile(user_id: number) {
    const user = await this.userService.findOne(user_id);
    delete user.password;
    return user;
  }

  async validateContributor(reviewData: AuthDto) {
    const review = await this.userService.validadeUserExist(
      reviewData.username,
    );

    const isMatch = await this.comparePassword(
      reviewData.password,
      review.password,
    );
    console.log(isMatch);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return review;
  }

  async comparePassword(password: string, hash: string) {
    console.log(password, hash)
    return await bcrypt.compare(password, hash);
  }

  public async validate(token: string): Promise<boolean> {
    const decoded = await this.jwtService.verify(token);
    const user = await this.userService.validadeUserExist(decoded.username);
    if (!decoded || !user) {
      throw new UnauthorizedException();
    }
    return true;
  }

  public decode(token: string): any {
    return this.jwtService.decode(token, null);
  }
}
