import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceEntity } from './entities/insurance.entity';

@Module({
  controllers: [InsuranceController],
  providers: [InsuranceService],
  imports: [TypeOrmModule.forFeature([InsuranceEntity])],
})
export class InsuranceModule {}
