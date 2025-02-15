import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../types/Role.enum';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(3)
  username?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  fullName?: string;

  @IsEmail()
  email?: string;

  @IsString()
  cpf?: string;

  @IsString()
  phone?: string;

  @IsEnum(Role)
  role?: Role;
}
