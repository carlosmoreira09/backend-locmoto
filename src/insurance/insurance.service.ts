import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceEntity } from './entities/insurance.entity';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { VehicleService } from '../vehicles/vehicles.service';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(InsuranceEntity)
    private insuranceRepository: Repository<InsuranceEntity>,
    private vehicleService: VehicleService,
  ) {}

  async create(insuranceData: CreateInsuranceDto): Promise<InsuranceEntity> {
    const vehicle = await this.vehicleService.findOne(insuranceData.vehicle);
    const insurance = this.insuranceRepository.create({
      ...insuranceData,
      vehicle: vehicle,
    });
    return await this.insuranceRepository.save(insurance);
  }

  async findAll(): Promise<InsuranceEntity[]> {
    return await this.insuranceRepository.find();
  }

  async findOne(id: number): Promise<InsuranceEntity> {
    return await this.insuranceRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    insuranceData: UpdateInsuranceDto,
  ): Promise<InsuranceEntity> {
    const vehicle = await this.vehicleService.findOne(insuranceData.vehicle);

    await this.insuranceRepository.update(id, {
      ...insuranceData,
      vehicle: vehicle,
    });
    return await this.insuranceRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.insuranceRepository.delete(id);
    return result.affected > 0;
  }
}
