import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficFineEntity } from './entities/traffic-fine.entity';
import { CreateTrafficFineDto } from './dto/create-traffic-fine.dto';
import { VehicleService } from '../vehicles/vehicles.service';
import { ClientService } from '../clients/clients.service';

@Injectable()
export class TrafficFineService {
  constructor(
    @InjectRepository(TrafficFineEntity)
    private trafficFineRepository: Repository<TrafficFineEntity>,
    private vehicleService: VehicleService,
    private clientService: ClientService,
  ) {}

  async create(
    createTrafficFineDto: CreateTrafficFineDto,
  ): Promise<TrafficFineEntity> {
    try {
      const vehicle = await this.vehicleService.findOne(
        createTrafficFineDto.vehicle,
      );
      const client = await this.clientService.findOne(
        createTrafficFineDto.clientId,
      );

      const trafficFine = this.trafficFineRepository.create({
        ...createTrafficFineDto,
        vehicle: vehicle,
        client: client,
      });
      const newFine = await this.trafficFineRepository.save(trafficFine);
      client.fines.push(newFine);
      vehicle.trafficFines.push(newFine);
      return newFine;
    } catch (error) {
      throw new HttpException(
        'Error creating traffic fine: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<TrafficFineEntity[]> {
    try {
      const trafficFines = await this.trafficFineRepository.find({
        relations: ['vehicle'],
      });
      if (!trafficFines.length) {
        throw new HttpException('No traffic fines found', HttpStatus.NOT_FOUND);
      }
      return trafficFines;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error fetching traffic fines',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<TrafficFineEntity> {
    try {
      const trafficFine = await this.trafficFineRepository.findOne({
        where: { id },
        relations: ['vehicle'],
      });
      if (!trafficFine) {
        throw new HttpException('Traffic fine not found', HttpStatus.NOT_FOUND);
      }
      return trafficFine;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error fetching traffic fine',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateTrafficFineDto: Partial<CreateTrafficFineDto>,
  ): Promise<TrafficFineEntity> {
    try {
      const trafficFine = await this.findOne(id);
      if (!trafficFine) {
        throw new Error('Error updating traffic fine');
      }
      const vehicle = await this.vehicleService.findOne(
        updateTrafficFineDto.vehicle,
      );
      await this.trafficFineRepository.update(id, {
        ...updateTrafficFineDto,
        vehicle,
      });
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error updating traffic fine',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const trafficFine = await this.findOne(id);
      await this.trafficFineRepository.softRemove(trafficFine);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Error removing traffic fine',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
