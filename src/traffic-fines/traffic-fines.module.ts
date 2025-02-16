import { Module } from '@nestjs/common';
import { TrafficFineEntity } from './entities/traffic-fine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficFineController } from './traffic-fines.controller';
import { TrafficFineService } from './traffic-fines.service';
import { VehicleEntity } from '../vehicles/entities/vehicle.entity';
import { VehicleService } from '../vehicles/vehicles.service';
import { TenantService } from '../tenant/tenant.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';

@Module({
  controllers: [TrafficFineController],
  providers: [TrafficFineService, VehicleService, TenantService],
  imports: [
    TypeOrmModule.forFeature([TrafficFineEntity, VehicleEntity, TenantEntity]),
  ],
})
export class TrafficFinesModule {}
