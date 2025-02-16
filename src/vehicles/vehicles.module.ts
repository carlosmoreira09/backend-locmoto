import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { TenantService } from '../tenant/tenant.service';
import { TrafficFineEntity } from '../traffic-fines/entities/traffic-fine.entity';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, TenantService],
  imports: [
    TypeOrmModule.forFeature([VehicleEntity, TenantEntity, TrafficFineEntity]),
  ],
})
export class VehiclesModule {}
