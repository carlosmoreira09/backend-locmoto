import { Module } from '@nestjs/common';
import { PriceTableService } from './price-table.service';
import { PriceTableController } from './price-table.controller';
import { PriceTableEntity } from './entities/price-table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from '../vehicles/entities/vehicle.entity';
import { VehicleService } from '../vehicles/vehicles.service';
import { TenantService } from '../tenant/tenant.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';

@Module({
  controllers: [PriceTableController],
  providers: [PriceTableService, VehicleService, TenantService],
  imports: [
    TypeOrmModule.forFeature([PriceTableEntity, VehicleEntity, TenantEntity]),
  ],
})
export class PriceTableModule {}
