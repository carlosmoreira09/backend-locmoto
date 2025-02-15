import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
