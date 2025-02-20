import { Module } from '@nestjs/common';
import { PriceTableService } from './price-table.service';
import { PriceTableController } from './price-table.controller';
import { PriceTableEntity } from './entities/price-table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PriceTableController],
  providers: [PriceTableService],
  imports: [TypeOrmModule.forFeature([PriceTableEntity])],
})
export class PriceTableModule {}
