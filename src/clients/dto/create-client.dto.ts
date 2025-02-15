import { IsBoolean, IsDate, IsString, ValidateIf } from 'class-validator';
export class CreateClientDto {
  @IsString()
  personType: string;
  @IsString()
  fullName: string;
  @IsString()
  document?: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  rg?: string | null;
  @IsDate()
  @ValidateIf((object, value) => value !== null)
  rgEmitDate?: Date;
  @IsDate()
  @ValidateIf((object, value) => value !== null)
  rgExpired?: Date;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  rgEmitBy?: string;
  @IsString()
  phone: string;
  @IsString()
  email: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  nacionality?: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  maritalStatus?: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  stateRegister?: string;
  @IsDate()
  @ValidateIf((object, value) => value !== null)
  dob?: Date;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  gender?: string;
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  isBlock: boolean;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  blockReason?: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  observations?: string;
  @IsString()
  address: string;
  @IsString()
  zip_code?: string;
}
