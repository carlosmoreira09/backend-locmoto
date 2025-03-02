import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverEntity } from './entities/driver.entity';
import { ClientService } from '../clients/clients.service';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    private clientService: ClientService,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<DriverEntity> {
    const client = await this.clientService.findOne(createDriverDto.clientId);

    const driver = this.driverRepository.create({
      ...createDriverDto,
      client: client,
    });
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

  async remove(id: number): Promise<DriverEntity> {
    const driver = await this.findOne(id);
    return await this.driverRepository.softRemove(driver);
  }

  async findAllDriversID() {
    return await this.driverRepository.find({
      select: {
        id: true,
        driverName: true,
      },
    });
  }
}
