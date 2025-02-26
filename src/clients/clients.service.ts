import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async create(client: CreateClientDto): Promise<ClientEntity> {
    const newClient = this.clientRepository.create(client);
    const result = await this.clientRepository.save(newClient);
    if (!result) {
      throw new NotFoundException(`Error to save client`);
    }
    return result;
  }

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.find({ relations: ['drivers'] });
  }

  async findOne(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({
      where: { id_client: id },
      relations: ['drivers', 'fines'],
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, client: ClientEntity): Promise<ClientEntity> {
    const existingClient: ClientEntity = await this.findOne(id);
    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    await this.clientRepository.update(id, client);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<ClientEntity> {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return await this.clientRepository.softRemove(client);
  }

  async findByCpf(document: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ where: { document } });
    if (!client) {
      throw new NotFoundException(`Client with CPF ${document} not found`);
    }
    return client;
  }
}
