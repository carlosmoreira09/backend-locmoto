import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { GeneralReturnDto } from '../types/generalReturn.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async create(client: CreateClientDto): Promise<GeneralReturnDto> {
    const newClient = this.clientRepository.create(client);
    const result = await this.clientRepository.save(newClient);

    if (result) {
      return {
        status: 201,
        message: 'Cliente Registrado com Sucesso',
      };
    } else {
      throw new Error('Não foi possível cadastrar o cliente');
    }
  }

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({
      where: { id_client: id },
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

  async remove(id: number): Promise<void> {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }

  async findByCpf(document: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ where: { document } });
    if (!client) {
      throw new NotFoundException(`Client with CPF ${document} not found`);
    }
    return client;
  }
}
