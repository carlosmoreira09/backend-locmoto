import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverEntity } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<DriverEntity> {
    const driver = this.driverRepository.create(createDriverDto);
    return await this.driverRepository.save(driver);
  }

  async findAll(): Promise<DriverEntity[]> {
    return await this.driverRepository.find({ relations: ['client'] });
  }

  async findOne(id: number): Promise<DriverEntity> {
    return await this.driverRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async update(
    id: number,
    updateDriverDto: Partial<CreateDriverDto>,
  ): Promise<DriverEntity> {
    await this.driverRepository.update(id, updateDriverDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const driver = await this.findOne(id);
    await this.driverRepository.softRemove(driver);
  }
}
