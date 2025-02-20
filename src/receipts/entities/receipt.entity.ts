// receipt.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, JoinColumn, ManyToOne,
} from 'typeorm';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity('receipt')
export class ReceiptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  companyName: string;

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

  @ManyToOne(() => ClientEntity, (vehicle) => vehicle.receipts)
  @JoinColumn()
  client: ClientEntity;

  @Column()
  price: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deletedAt: Date;
}
