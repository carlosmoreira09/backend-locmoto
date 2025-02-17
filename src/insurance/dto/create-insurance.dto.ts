import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateInsuranceDto {
  @IsString()
  companyName: string;
  @IsString()
  policyNumber: string;
  @IsDate()
  startDate: Date;
  @IsDate()
  endDate: Date;
  @IsString()
  situation: string;
  @IsString()
  awardType: string;
  @IsString()
  policytype: string;
  @IsString()
  supplier: string;
  @IsString()
  supplierName: string;
  @IsNumber({ maxDecimalPlaces: 2 })
  policyValueLiquid: number;
  @IsNumber({ maxDecimalPlaces: 2 })
  iofValue: number;
  @IsNumber({ maxDecimalPlaces: 2 })
  awardTotalPolicy: number;
  @IsNumber()
  vehicle: number;
}
