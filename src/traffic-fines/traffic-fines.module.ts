import { Module } from '@nestjs/common';
import { TrafficFineEntity } from './entities/traffic-fine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficFineController } from './traffic-fines.controller';
import { TrafficFineService } from './traffic-fines.service';
import { VehicleEntity } from '../vehicles/entities/vehicle.entity';
import { VehicleService } from '../vehicles/vehicles.service';
import { TenantService } from '../tenant/tenant.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { ClientService } from '../clients/clients.service';
import { ClientEntity } from '../clients/entities/client.entity';

@Module({
  controllers: [TrafficFineController],
  providers: [TrafficFineService, VehicleService, TenantService, ClientService],
  imports: [
    TypeOrmModule.forFeature([
      TrafficFineEntity,
      VehicleEntity,
      TenantEntity,
      ClientEntity,
    ]),
  ],
})
export class TrafficFinesModule {}
