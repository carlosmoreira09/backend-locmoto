import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VehicleEntity } from '../../vehicles/entities/vehicle.entity';
import { ReceiptEntity } from '../../receipts/entities/receipt.entity';

@Entity({ name: 'tenant' })
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id_tenant!: number;

  @Column({
    unique: true,
    nullable: false,
  })
  tenant_name: string;

  @Column()
  tenant_contact: string;

  @OneToMany(() => VehicleEntity, (vehicle) => vehicle.tenant)
  vehicles: VehicleEntity[];

  @OneToOne(() => ReceiptEntity, (receipt) => receipt.tenant)
  receipt: ReceiptEntity;
}
