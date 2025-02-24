import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './entities/driver.entity';
import { DriversService } from './drivers.service';
import { ClientEntity } from '../clients/entities/client.entity';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { ClientService } from '../clients/clients.service';
import { TenantService } from '../tenant/tenant.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService, ClientService, TenantService],
  imports: [
    TypeOrmModule.forFeature([DriverEntity, ClientEntity, TenantEntity]),
  ],
})
export class DriversModule {}
