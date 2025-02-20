import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriceTableDto } from './dto/create-price-table.dto';
import { PriceTableEntity } from './entities/price-table.entity';

@Injectable()
export class PriceTableService {
  constructor(
    @InjectRepository(PriceTableEntity)
    private priceTableRepository: Repository<PriceTableEntity>,
  ) {}

  async create(
    createPriceTableDto: CreatePriceTableDto,
  ): Promise<PriceTableEntity> {
    try {

      const priceTable = this.priceTableRepository.create(createPriceTableDto);
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
        'Error fetching price table entries',
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
}
