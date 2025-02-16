import { IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  plateNumber: string;
  @IsString()
  color: string;
  @IsString()
  renavam: string;
  @IsString()
  chassi: string;
  @IsString()
  yearModelBuild: string;
  @IsString()
  fuelType: string;
  @IsString()
  modelName: string;
  @IsString()
  isActive: string;
  @IsString()
  vehicleObs: string;
  @IsString()
  company: string;
  @IsString()
  odometer: string;
  @IsString()
  location: string;
  @IsNumber()
  tenant: number;
}
