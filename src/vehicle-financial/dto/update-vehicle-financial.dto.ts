import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleFinancialDto } from './create-vehicle-financial.dto';

export class UpdateVehicleFinancialDto extends PartialType(CreateVehicleFinancialDto) {}
