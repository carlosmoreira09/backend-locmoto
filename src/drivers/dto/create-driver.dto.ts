import { IsBoolean, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  motherName: string;
  @IsString()
  fatherName: string;
  @IsString()
  city: string;
  @IsString()
  cnhNumber: string;
  @IsString()
  cnhRegister: string;
  @IsString()
  cnhSafeNumber: string;
  @IsString()
  cnhEmitBy: string;
  @IsString()
  cnhCategory: string;
  @IsString()
  cnhEmitFirst: string;
  @IsString()
  cngExpired: string;
  @IsBoolean()
  isActive: boolean;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  driverObs: string;
  @IsNumber()
  clientId: number;
}
