import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { TenantService } from '../tenant/tenant.service';
import { TrafficFineEntity } from '../traffic-fines/entities/traffic-fine.entity';
import { PriceTableEntity } from '../price-table/entities/price-table.entity';
import { PriceTableService } from '../price-table/price-table.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, TenantService, PriceTableService],
  imports: [
    TypeOrmModule.forFeature([
      VehicleEntity,
      TenantEntity,
      TrafficFineEntity,
      PriceTableEntity,
    ]),
  ],
})
export class VehiclesModule {}
