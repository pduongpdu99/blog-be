import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';
@Table
export class Tag extends BaseEntity {
  @Column({ primaryKey: true, type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.BIGINT })
  parentId: number;

  @Column({ type: DataType.STRING(100) })
  title: string;
}
