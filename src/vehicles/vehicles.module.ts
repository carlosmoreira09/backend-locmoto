import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { TenantService } from '../tenant/tenant.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, TenantService],
  imports: [TypeOrmModule.forFeature([VehicleEntity, TenantEntity])],
})
export class VehiclesModule {}
