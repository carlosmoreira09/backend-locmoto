import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { GeneralReturnDto } from '../types/generalReturn.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    try {
      await this.driversService.create(createDriverDto);
      return {
        status: 201,
        message: 'Condutor Adicionado',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const list = await this.driversService.findAll();
      return {
        status: 201,
        message: 'Lista de Condutores',
        data: list,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const driver = await this.driversService.findOne(parseInt(id));
      return {
        status: 200,
        message: 'Dados do Condutor',
        data: [driver],
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/ids')
  async findAllDriversID(): Promise<GeneralReturnDto> {
    try {
      const list = await this.driversService.findAllDriversID();

      return {
        status: 200,
        message: 'Lista de IDs de Motoristas',
        data: list,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    try {
      await this.driversService.update(parseInt(id), updateDriverDto);
      return {
        status: 200,
        message: 'Condutor Atualizado',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.driversService.remove(parseInt(id));
      return {
        status: 200,
        message: 'Condutor removido',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
