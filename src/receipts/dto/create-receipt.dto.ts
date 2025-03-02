import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateReceiptDto {
  @IsString()
  status: string;
  @IsString()
  companyName: string;
  @IsString()
  nfseNumber: string;
  @IsDate()
  nfseDate: Date;
  @IsDate()
  expiredDate: Date;
  @IsDate()
  monthReference: Date;
  @IsNumber()
  contractNumber: number;
  @IsNumber()
  client: number;
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
  @IsNumber()
  tenant: number;
}
