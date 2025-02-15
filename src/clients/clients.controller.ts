import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientService } from './clients.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { GeneralReturnDto } from '../types/generalReturn.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() client: CreateClientDto): Promise<GeneralReturnDto> {
    try {
      await this.clientService.create(client);
      return {
        status: 201,
        message: 'Cliente adicionado',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<GeneralReturnDto> {
    try {
      const list = await this.clientService.findAll();
      return {
        status: 200,
        message: 'Lista de Clientes',
        data: list,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GeneralReturnDto> {
    try {
      const client = await this.clientService.findOne(id);
      return {
        status: 200,
        message: 'Cliente removido',
        data: [client],
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() client: ClientEntity,
  ): Promise<GeneralReturnDto> {
    try {
      await this.clientService.update(id, client);
      return {
        status: 200,
        message: 'Cliente Atualizado',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<GeneralReturnDto> {
    try {
      await this.clientService.remove(id);
      return {
        status: 200,
        message: 'Cliente removido',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search/cpf')
  async findByCpf(@Query('cpf') cpf: string): Promise<GeneralReturnDto> {
    try {
      const client = await this.clientService.findByCpf(cpf);
      return {
        status: 200,
        message: 'Cliente removido',
        data: [client],
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
