import { Module } from '@nestjs/common';
import { VehicleFinancialService } from './vehicle-financial.service';
import { VehicleFinancialController } from './vehicle-financial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleFinancialEntity } from './entities/vehicle-financial.entity';
import { VehicleEntity } from '../vehicles/entities/vehicle.entity';
import { VehicleService } from '../vehicles/vehicles.service';
import { TenantService } from '../tenant/tenant.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';

@Module({
  controllers: [VehicleFinancialController],
  providers: [VehicleFinancialService, VehicleService, TenantService],
  imports: [
    TypeOrmModule.forFeature([
      VehicleFinancialEntity,
      VehicleEntity,
      TenantEntity,
    ]),
  ],
})
export class VehicleFinancialModule {}
