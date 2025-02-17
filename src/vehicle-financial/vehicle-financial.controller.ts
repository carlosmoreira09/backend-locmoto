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
import { VehicleFinancialService } from './vehicle-financial.service';
import { CreateVehicleFinancialDto } from './dto/create-vehicle-financial.dto';

@Controller('vehicle-financials')
export class VehicleFinancialController {
  constructor(
    private readonly vehicleFinancialService: VehicleFinancialService,
  ) {}

  @Post()
  async create(@Body() createVehicleFinancialDto: CreateVehicleFinancialDto) {
    try {
      const vehicleFinancial = await this.vehicleFinancialService.create(
        createVehicleFinancialDto,
      );
      return {
        status: HttpStatus.CREATED,
        message: 'Vehicle financial record created successfully',
        data: vehicleFinancial,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create vehicle financial record',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const vehicleFinancials = await this.vehicleFinancialService.findAll();
      return {
        status: HttpStatus.OK,
        data: vehicleFinancials,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch vehicle financial records',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle financial record ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const vehicleFinancial = await this.vehicleFinancialService.findOne(+id);
      return {
        status: HttpStatus.OK,
        data: vehicleFinancial,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch vehicle financial record',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleFinancialDto: Partial<CreateVehicleFinancialDto>,
  ) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle financial record ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const vehicleFinancial = await this.vehicleFinancialService.update(
        +id,
        updateVehicleFinancialDto,
      );
      return {
        status: HttpStatus.OK,
        message: 'Vehicle financial record updated successfully',
        data: vehicleFinancial,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to update vehicle financial record',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle financial record ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.vehicleFinancialService.remove(+id);
      return {
        status: HttpStatus.OK,
        message: 'Vehicle financial record deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to delete vehicle financial record',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
