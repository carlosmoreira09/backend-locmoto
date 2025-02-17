import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceEntity } from './entities/insurance.entity';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(InsuranceEntity)
    private insuranceRepository: Repository<InsuranceEntity>,
  ) {}

  async create(insuranceData: CreateInsuranceDto): Promise<InsuranceEntity> {
    const insurance = this.insuranceRepository.create(insuranceData);
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
    await this.insuranceRepository.update(id, insuranceData);
    return await this.insuranceRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.insuranceRepository.delete(id);
    return result.affected > 0;
  }
}