import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const checkUserExists = await this.validadeUserExist(
      createUserDto.username,
    );

    if (checkUserExists) {
      throw new HttpException('Usuario já existe', HttpStatus.FOUND);
    }

    const newPassword = await bcrypt.hash(createUserDto.password, 12);
    console.log(newPassword);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: newPassword,
    });
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UsersEntity> {
    return await this.usersRepository.findOneBy({ id_user: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UsersEntity> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id)
    await this.usersRepository.softRemove(user);
  }
  async validadeUserExist(user: string) {
    return await this.usersRepository.findOne({
      where: {
        username: user,
      },
    });
  }
}
