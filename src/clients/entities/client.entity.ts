import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DriverEntity } from '../../drivers/entities/driver.entity';
import { ReceiptEntity } from '../../receipts/entities/receipt.entity';
import { TrafficFineEntity } from '../../traffic-fines/entities/traffic-fine.entity';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id_client: number;

  @Column()
  personType: string;

  @Column()
  fullName: string;

  @Column({ length: 14, nullable: true })
  document: string;

  @Column({ nullable: true })
  rg: string;

  @Column({ nullable: true })
  rgEmitDate: Date;

  @Column({ nullable: true })
  rgExpired: Date;

  @Column({ nullable: true })
  rgEmitBy: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ length: 255 })
  email: string;

  @Column({ nullable: true })
  nacionality: string;

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  stateRegister: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ default: false })
  isBlock: boolean;

  @Column({ nullable: true })
  blockReason: string;

  @Column({ length: 500, nullable: true })
  observations: string;

  @Column()
  address: string;

  @Column({ length: 8, nullable: true })
  zip_code: string;

  @OneToMany(() => DriverEntity, (driver) => driver.client, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  drivers: DriverEntity[];

  @OneToMany(() => ReceiptEntity, (receipt) => receipt.client, {
    nullable: true,
  })
  @JoinColumn()
  receipts: ReceiptEntity[];

  @OneToMany(() => TrafficFineEntity, (fines) => fines.client, {
    nullable: true,
  })
  @JoinColumn()
  fines: TrafficFineEntity[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deletedAt: Date;
}
