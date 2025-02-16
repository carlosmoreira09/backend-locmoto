import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn, OneToMany,
} from 'typeorm';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { TrafficFineEntity } from '../../traffic-fines/entities/traffic-fine.entity';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @Column()
  color: string;

  @Column()
  renavam: string;

  @Column()
  chassi: string;

  @Column()
  yearModelBuild: string;

  @Column()
  fuelType: string;

  @Column()
  modelName: string;

  @Column()
  isActive: string;

  @Column({ nullable: true })
  vehicleObs: string;

  @Column()
  company: string;

  @Column()
  odometer: string;

  @Column()
  location: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.vehicles)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @OneToMany(() => TrafficFineEntity, (driver) => driver.vehicle, {
    cascade: true,
    eager: false,
  })
  trafficFines: TrafficFineEntity[];
}
