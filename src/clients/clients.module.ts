import { Module } from '@nestjs/common';
import { ClientController } from './clients.controller';
import { ClientService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [TypeOrmModule.forFeature([ClientEntity])]
})
export class ClientsModule {}
