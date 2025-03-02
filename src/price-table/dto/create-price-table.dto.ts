import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePriceTableDto {
  @IsNumber()
  vehicle: number;
  @IsNumber()
  price: number;
  @IsNumber()
  updateBy: number;
  @IsString()
  period: string;
  @IsDate()
  validFrom: Date;
  @IsDate()
  validTo: Date;
}
