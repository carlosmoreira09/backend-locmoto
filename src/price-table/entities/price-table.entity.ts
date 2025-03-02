import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { VehicleEntity } from '../../vehicles/entities/vehicle.entity';
import { UsersEntity } from '../../users/entities/user.entity';

@Entity('price_table')
export class PriceTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.priceTable)
  @JoinColumn()
  vehicle: VehicleEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => UsersEntity, (user) => user.id_user, {
    nullable: true,
  })
  @JoinColumn()
  updateBy: UsersEntity;

  @Column()
  period: string;

  @Column({ default: true })
  isActive: boolean;

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
