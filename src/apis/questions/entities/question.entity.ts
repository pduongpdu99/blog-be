import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Question extends BaseEntity {
  @Column({ primaryKey: true, type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  userId: string;

  @Column({ type: DataType.STRING(50) })
  title: string;

  @Column({ type: DataType.STRING(200) })
  describe: string;
}
