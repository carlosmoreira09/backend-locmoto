import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ValidationPipe,
  Headers,
} from '@nestjs/common';
import { PriceTableService } from './price-table.service';
import { CreatePriceTableDto } from './dto/create-price-table.dto';

@Controller('price-table')
export class PriceTableController {
  constructor(private readonly priceTableService: PriceTableService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createPriceTableDto: CreatePriceTableDto,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    try {
      await this.priceTableService.create(createPriceTableDto, +tenantId);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Price table entry created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error creating price table entry' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.priceTableService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Price table entries retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error fetching price table entries' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('vehicle/:id')
  async findPriceTableByVehicle(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    try {
      const result = await this.priceTableService.findPriceByVehicle(
        +id,
        +tenantId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Price table entries retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error fetching price table entries' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.priceTableService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Price table entry retrieved successfully',
        data: [result],
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error fetching price table entry' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.priceTableService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Price table entry deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error deleting price table entry' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
