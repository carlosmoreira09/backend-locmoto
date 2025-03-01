import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { GeneralReturnDto } from '../types/generalReturn.dto';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  // Create
  @Post()
  async create(@Body() insuranceData: CreateInsuranceDto) {
    try {
      const insurance = await this.insuranceService.create(insuranceData);
      return {
        message: 'Insurance created successfully',
        data: insurance,
      };
    } catch (error) {
      throw new HttpException(
        'Error creating insurance ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Read All
  @Get()
  async findAll() {
    try {
      const insurances = await this.insuranceService.findAll();
      return {
        data: insurances,
      };
    } catch (error) {
      throw new HttpException(
        'Error fetching insurances: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Read One
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const insurance = await this.insuranceService.findOne(id);
      if (!insurance) {
        throw new HttpException('Insurance not found', HttpStatus.NOT_FOUND);
      }
      return {
        data: insurance,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching insurance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/ids')
  async findAllInsuranceID(): Promise<GeneralReturnDto> {
    try {
      const list = await this.insuranceService.findAllInsurancesID();

      return {
        status: 200,
        message: 'Lista de IDs de Seguros',
        data: list,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  // Update
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() insuranceData: CreateInsuranceDto,
  ) {
    try {
      const insurance = await this.insuranceService.update(id, insuranceData);
      if (!insurance) {
        throw new HttpException('Insurance not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Insurance updated successfully',
        data: insurance,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error updating insurance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.insuranceService.remove(id);
      if (!result) {
        throw new HttpException('Insurance not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Insurance deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error deleting insurance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
