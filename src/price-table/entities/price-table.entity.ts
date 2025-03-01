import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { VehicleEntity } from '../../vehicles/entities/vehicle.entity';

@Entity('price_table')
export class PriceTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.priceTable)
  @JoinColumn()
  vehicle: VehicleEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  updateBy: number;

  @Column()
  period: string;

  @OneToOne(() => TenantEntity, (tenant) => tenant.receipt)
  @JoinColumn()
  tenant: TenantEntity;

  @Column()
  validFrom: Date;
  @Column()
  validTo: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
