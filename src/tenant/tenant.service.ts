import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
  ) {}

  async findOne(id: number): Promise<TenantEntity> {
    return await this.tenantRepository.findOneBy({ id_tenant: id });
  }

  async findAll(): Promise<TenantEntity[]> {
    return await this.tenantRepository.find();
  }
}
