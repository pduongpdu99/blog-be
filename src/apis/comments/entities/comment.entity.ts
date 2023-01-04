import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Comment extends BaseEntity {
  @Column({ primaryKey: true, type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  userId: string;

  @Column({ type: DataType.BIGINT })
  questionId: number;

  @Column({ type: DataType.BIGINT })
  parentId: number;

  @Column({ type: DataType.TEXT })
  content: string;
}
