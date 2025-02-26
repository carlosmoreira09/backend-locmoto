import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { VehicleEntity } from '../../vehicles/entities/vehicle.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity('traffic_fines')
export class TrafficFineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fineNumber: string;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.trafficFines)
  vehicle: VehicleEntity;

  @Column()
  fineDate: Date;

  @Column()
  autoNumber: string;

  @Column()
  origin: string;

  @Column()
  severity: string;

  @Column({ nullable: true })
  violationObs: string;

  @Column()
  isIntern: boolean;

  @Column()
  isNotification: boolean;

  @Column()
  isRepeatOffender: boolean;

  @Column()
  violationAddress: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @ManyToOne(() => ClientEntity, (vehicle) => vehicle.receipts)
  @JoinColumn()
  client: ClientEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
