import { IsBoolean, IsDate, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrafficFineDto {
  @IsString()
  fineNumber: string;
  @IsNumber()
  vehicle: number;
  @IsDate()
  fineDate: Date;
  @IsString()
  autoNumber: string;
  @IsString()
  origin: string;
  @IsString()
  severity: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  violationObs: string;
  @IsBoolean()
  isIntern: boolean;
  @IsBoolean()
  isNotification: boolean;
  @IsBoolean()
  isRepeatOffender: boolean;
  @IsString()
  violationAddress: string;
  @IsString()
  city: string;
  @IsString()
  uf: string;
  @IsString()
  clientId: number;
}
