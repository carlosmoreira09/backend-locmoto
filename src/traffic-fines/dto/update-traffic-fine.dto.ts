import { PartialType } from '@nestjs/mapped-types';
import { CreateTrafficFineDto } from './create-traffic-fine.dto';

export class UpdateTrafficFineDto extends PartialType(CreateTrafficFineDto) {}
