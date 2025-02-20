import { Module } from '@nestjs/common';
import { ReceiptController } from './receipts.controller';
import { ReceiptService } from './receipts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptEntity } from './entities/receipt.entity';
import { ClientEntity } from '../clients/entities/client.entity';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { ClientService } from '../clients/clients.service';
import { TenantService } from '../tenant/tenant.service';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService, ClientService, TenantService],
  imports: [
    TypeOrmModule.forFeature([ReceiptEntity, ClientEntity, TenantEntity]),
  ],
})
export class ReceiptsModule {}
