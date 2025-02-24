import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity('drivers')
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driverName: string;

  @Column()
  motherName: string;

  @Column()
  fatherName: string;

  @Column()
  city: string;

  @Column()
  cnhNumber: string;

  @Column()
  cnhRegister: string;

  @Column()
  cnhSafeNumber: string;

  @Column()
  cnhEmitBy: string;

  @Column()
  cnhCategory: string;

  @Column()
  cnhEmitFirst: string;

  @Column()
  cngExpired: string;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  driverObs: string;

  @ManyToOne(() => ClientEntity, (client) => client.drivers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deletedAt: Date;
}
