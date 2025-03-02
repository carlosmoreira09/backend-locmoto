import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptEntity } from './entities/receipt.entity';
import { ClientService } from '../clients/clients.service';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(ReceiptEntity)
    private receiptRepository: Repository<ReceiptEntity>,
    private clientService: ClientService,
  ) {}

  async create(
    createReceiptDto: CreateReceiptDto,
    tenantID: number,
  ): Promise<ReceiptEntity> {
    const client = await this.clientService.findOne(createReceiptDto.client);
    if (!client) {
      throw new NotFoundException(
        `Client ID ${createReceiptDto.client} not found`,
      );
    }

    const receipt = this.receiptRepository.create({
      ...createReceiptDto,
      client: client,
      tenant: { id_tenant: tenantID },
    });
    return await this.receiptRepository.save(receipt);
  }

  async findAll(): Promise<ReceiptEntity[]> {
    return await this.receiptRepository.find();
  }

  async findOne(id: number): Promise<ReceiptEntity> {
    const receipt = await this.receiptRepository.findOne({ where: { id } });
    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }
    return receipt;
  }

  async update(
    id: number,
    updateReceiptDto: Partial<CreateReceiptDto>,
  ): Promise<ReceiptEntity> {
    const receipt = await this.findOne(id);
    Object.assign(receipt, updateReceiptDto);
    return await this.receiptRepository.save(receipt);
  }

  async remove(id: number): Promise<void> {
    const receipt = await this.findOne(id);
    await this.receiptRepository.remove(receipt);
  }
}
