import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleFinancialEntity } from './entities/vehicle-financial.entity';
import { CreateVehicleFinancialDto } from './dto/create-vehicle-financial.dto';
import { VehicleService } from '../vehicles/vehicles.service';

@Injectable()
export class VehicleFinancialService {
  constructor(
    @InjectRepository(VehicleFinancialEntity)
    private vehicleFinancialRepository: Repository<VehicleFinancialEntity>,
    private vehicleService: VehicleService,
  ) {}

  async create(
    createVehicleFinancialDto: CreateVehicleFinancialDto,
  ): Promise<VehicleFinancialEntity> {
    try {
      const vehicle = await this.vehicleService.findOne(
        createVehicleFinancialDto.vehicle,
      );
      const vehicleFinancial = this.vehicleFinancialRepository.create({
        ...createVehicleFinancialDto,
        vehicle: vehicle,
      });
      return await this.vehicleFinancialRepository.save(vehicleFinancial);
    } catch (error) {
      throw new HttpException(
        'Error creating vehicle financial record:' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<VehicleFinancialEntity[]> {
    try {
      const vehicleFinancials = await this.vehicleFinancialRepository.find();
      if (!vehicleFinancials.length) {
        throw new HttpException(
          'No vehicle financial records found',
          HttpStatus.NOT_FOUND,
        );
      }
      return vehicleFinancials;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error fetching vehicle financial records',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<VehicleFinancialEntity> {
    try {
      const vehicleFinancial = await this.vehicleFinancialRepository.findOne({
        where: { id },
      });
      if (!vehicleFinancial) {
        throw new HttpException(
          'Vehicle financial record not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return vehicleFinancial;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error fetching vehicle financial record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateVehicleFinancialDto: Partial<CreateVehicleFinancialDto>,
  ): Promise<VehicleFinancialEntity> {
    try {
      const vehicle = await this.vehicleService.findOne(
        updateVehicleFinancialDto.vehicle,
      );
      const result = await this.vehicleFinancialRepository.update(+id, {
        ...updateVehicleFinancialDto,
        vehicle: vehicle,
      });
      console.log(result);
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error updating vehicle financial record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const vehicleFinancial = await this.findOne(id);
      await this.vehicleFinancialRepository.softRemove(vehicleFinancial);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error removing vehicle financial record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
