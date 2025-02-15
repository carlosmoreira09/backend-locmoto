import { IsString } from 'class-validator';

export class TenantDto {
  @IsString()
  tenant_name: string;

  @IsString()
  tenant_contact: string;
}
