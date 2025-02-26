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
  Headers,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleService } from './vehicles.service';
import { TenantId } from '../decorator/tenant.decorator';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    if (!tenantId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Tenant ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const vehicle = await this.vehicleService.create(
        createVehicleDto,
        +tenantId,
      );
      return {
        status: HttpStatus.CREATED,
        message: 'Vehicle created successfully',
        data: vehicle,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create vehicle',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Headers('x-tenant-id') tenantId: string) {
    if (!tenantId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Tenant ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const vehicles = await this.vehicleService.findAll(+tenantId);
      return {
        status: HttpStatus.OK,
        data: vehicles,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch vehicles',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    if (!id || !tenantId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle ID and Tenant ID are required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const vehicle = await this.vehicleService.findOne(+id, +tenantId);
      if (!vehicle) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Vehicle not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        status: HttpStatus.OK,
        data: [vehicle],
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch vehicle:' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @TenantId('tenantId') tenantId: string,
  ) {
    if (!id || !tenantId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle ID and Tenant ID are required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const vehicle = await this.vehicleService.update(
        +id,
        updateVehicleDto,
        +tenantId,
      );
      return {
        status: HttpStatus.OK,
        message: 'Vehicle updated successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to update vehicle:' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @TenantId('tenantId') tenantId: string,
  ) {
    if (!id || !tenantId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Vehicle ID and Tenant ID are required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.vehicleService.remove(+id, +tenantId);
      return {
        status: HttpStatus.OK,
        message: 'Vehicle deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to delete vehicle: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/tenant')
  async getVehiclesByTenant(@TenantId('tenantId') tenantId: string) {
    if (!tenantId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Tenant ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const vehicles = await this.vehicleService.findByTenant(+tenantId);
      return {
        status: HttpStatus.OK,
        data: [vehicles],
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch vehicles by tenant: ' + error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
