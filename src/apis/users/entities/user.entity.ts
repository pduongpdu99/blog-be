import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class User extends BaseEntity {
  @Column({ primaryKey: true, type: DataType.STRING })
  id: string;

  @Column({ type: DataType.BIGINT })
  roleId?: number = 0;

  @Column({ type: DataType.STRING })
  categoryIds: string | null = null;

  @Column({ type: DataType.STRING(10) })
  firstname: string;

  @Column({ type: DataType.STRING(10) })
  middlename?: string;

  @Column({ type: DataType.STRING(10) })
  lastname: string;

  @Column({ type: DataType.STRING(50) })
  email: string;

  @Column({ type: DataType.STRING })
  hash: string;

  @Column({ type: DataType.STRING(500) })
  bio?: string;
}
