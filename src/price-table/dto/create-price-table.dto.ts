import { IsNumber, IsString } from 'class-validator';

export class CreatePriceTableDto {
  @IsNumber()
  vehicle: number;
  @IsNumber()
  price: number;
  @IsNumber()
  updateBy: number;
  @IsString()
  period: string;
  @IsString()
  tenant: number;
}
