import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceEntity } from './entities/insurance.entity';
import { VehicleEntity } from '../vehicles/entities/vehicle.entity';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { VehicleService } from '../vehicles/vehicles.service';
import { TenantService } from '../tenant/tenant.service';

@Module({
  controllers: [InsuranceController],
  providers: [InsuranceService, VehicleService, TenantService],
  imports: [
    TypeOrmModule.forFeature([InsuranceEntity, VehicleEntity, TenantEntity]),
  ],
})
export class InsuranceModule {}
