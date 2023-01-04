import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Role extends BaseEntity {
  @Column({ primaryKey: true, type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(50) })
  name: string;
}
