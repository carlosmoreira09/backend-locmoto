import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { VehicleEntity } from '../../vehicles/entities/vehicle.entity';

@Entity('vehicle_financials')
export class VehicleFinancialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  supplierName: string;

  @Column()
  purchaseDay: Date;

  @Column()
  nfNumber: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  isFinancial: boolean;

  @Column()
  quuantityMonth: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monthlyPrice: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.vehicleFinancial)
  @JoinColumn() // Esta decoração deve estar no lado proprietário da relação
  vehicle: VehicleEntity;
}
