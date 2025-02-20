import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
} from 'typeorm';
import { VehicleEntity } from '../../vehicles/entities/vehicle.entity';

@Entity('insurance')
export class InsuranceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  insuranceCompany: string;

  @Column()
  policyNumber: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  situation: string;

  @Column()
  awardType: string;

  @Column()
  policytype: string;

  @Column()
  supplier: string;

  @Column()
  supplierName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  policyValueLiquid: number;

  @Column('decimal', { precision: 10, scale: 2 })
  iofValue: number;

  @Column('decimal', { precision: 10, scale: 2 })
  awardTotalPolicy: number;

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.insurance)
  @JoinColumn()
  vehicle: VehicleEntity;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deletedAt: Date;
}
