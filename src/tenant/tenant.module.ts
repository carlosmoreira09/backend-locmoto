import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';

@Module({
  providers: [TenantService],
  imports: [TypeOrmModule.forFeature([TenantEntity])],
})
export class TenantModule {}
