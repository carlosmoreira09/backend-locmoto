import { IsBoolean, IsDate, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateVehicleFinancialDto {
  @IsString()
  companyName: string;
  @IsString()
  supplierName: string;
  @IsDate()
  purchaseDay: Date;
  @IsString()
  nfNumber: string;
  @IsNumber({ maxDecimalPlaces: 2 })
  totalPrice: number;
  @IsBoolean()
  isFinancial: boolean;
  @IsNumber()
  quuantityMonth: number;
  @IsNumber({ maxDecimalPlaces: 2 })
  monthlyPrice: number;
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  vehicle: number;
}
