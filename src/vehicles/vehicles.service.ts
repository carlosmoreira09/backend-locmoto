import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { TenantService } from '../tenant/tenant.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
    private tenantService: TenantService,
  ) {}

  async create(
    createVehicleDto: CreateVehicleDto,
    tenantID: number,
  ): Promise<VehicleEntity> {
    const tenant = await this.tenantService.findOne(tenantID);
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      tenant: tenant,
    });
    return await this.vehicleRepository.save(vehicle);
  }

  async findAll(tenantID: number): Promise<VehicleEntity[]> {
    return await this.vehicleRepository.find({
      where: { tenant: { id_tenant: tenantID } },
    });
  }

  async findOne(id: number, tenantID?: number): Promise<VehicleEntity> {
    return await this.vehicleRepository.findOne({
      where: { id, tenant: { id_tenant: tenantID } },
      relations: ['tenant', 'trafficFines', 'vehicleFinancial', 'insurance'],
    });
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
    tenantID: number,
  ): Promise<VehicleEntity> {
    const tenant = await this.tenantService.findOne(tenantID);
    await this.vehicleRepository.update(id, {
      ...updateVehicleDto,
      tenant: tenant,
    });
    return await this.findOne(id, tenantID);
  }

  async remove(id: number, tenantID: number): Promise<VehicleEntity> {
    const vehicle = await this.findOne(id, tenantID);
    return await this.vehicleRepository.softRemove(vehicle);
  }
  async findByTenant(tenantId: number): Promise<VehicleEntity[]> {
    return await this.vehicleRepository.find({
      where: {
        tenant: {
          id_tenant: tenantId,
        },
      },
      relations: ['tenant'],
    });
  }
}
