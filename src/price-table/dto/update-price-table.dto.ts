import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceTableDto } from './create-price-table.dto';

export class UpdatePriceTableDto extends PartialType(CreatePriceTableDto) {}
