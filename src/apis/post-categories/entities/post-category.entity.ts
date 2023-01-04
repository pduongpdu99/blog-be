import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class PostCategory extends BaseEntity {
  @Column({ primaryKey: true, type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.BIGINT })
  categoryId: number;

  @Column({ type: DataType.BIGINT })
  postId: number;
}
