// receipt.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, JoinColumn, ManyToOne, OneToOne,
} from 'typeorm';
import { ClientEntity } from '../../clients/entities/client.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

@Entity('receipt')
export class ReceiptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  nfseNumber: string;

  @Column()
  nfseDate: Date;

  @Column()
  expiredDate: Date;

  @Column()
  monthReference: Date;

  @Column()
  contractNumber: number;

  @Column()
  price: number;

  @ManyToOne(() => ClientEntity, (vehicle) => vehicle.receipts)
  @JoinColumn()
  client: ClientEntity;

  @OneToOne(() => TenantEntity, (tenant) => tenant.receipt)
  @JoinColumn()
  tenant: TenantEntity;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deletedAt: Date;
}
