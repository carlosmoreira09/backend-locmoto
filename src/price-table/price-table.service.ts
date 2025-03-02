import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriceTableDto } from './dto/create-price-table.dto';
import { PriceTableEntity } from './entities/price-table.entity';
import { VehicleService } from '../vehicles/vehicles.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PriceTableService {
  constructor(
    @InjectRepository(PriceTableEntity)
    private priceTableRepository: Repository<PriceTableEntity>,
    private vehicleService: VehicleService,
    private userService: UsersService,
  ) {}

  async create(
    createPriceTableDto: CreatePriceTableDto,
    id_tenant: number,
    id_user: number,
  ): Promise<PriceTableEntity> {
    try {
      const vehicle = await this.vehicleService.findOne(
        createPriceTableDto.vehicle,
      );
      const user = await this.userService.findOne(id_user);

      if (!vehicle) {
        throw new NotFoundException(
          `Vehicle entry ID ${createPriceTableDto.vehicle} not found`,
        );
      }
      const priceTable = this.priceTableRepository.create({
        ...createPriceTableDto,
        updateBy: user,
        vehicle: vehicle,
        tenant: { id_tenant: id_tenant },
      });
      return await this.priceTableRepository.save(priceTable);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating price table entry: ' + error.message,
      );
    }
  }

  async findAll(): Promise<PriceTableEntity[]> {
    try {
      return await this.priceTableRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching price table entries' + error.message,
      );
    }
  }

  async findOne(id: number): Promise<PriceTableEntity> {
    try {
      const priceTable = await this.priceTableRepository.findOne({
        where: { id },
      });
      if (!priceTable) {
        throw new NotFoundException(
          `Price table entry with ID ${id} not found`,
        );
      }
      return priceTable;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error fetching price table entry',
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.priceTableRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(
          `Price table entry with ID ${id} not found`,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error deleting price table entry',
      );
    }
  }
  async findPriceByVehicle(id_vehicle: number, id_tenant: number) {
    return await this.priceTableRepository.find({
      select: {
        id: true,
        price: true,
        period: true,
      },
      where: {
        vehicle: {
          id: id_vehicle,
        },
        tenant: { id_tenant: id_tenant },
      },
    });
  }
}
