import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('price_table')
export class PriceTableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicle: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  updateBy: number;

  @Column()
  period: string;

  @Column()
  tenant: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}