import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class PostComment extends BaseEntity {
  @Column({ primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  postId: string;

  @Column({ type: DataType.STRING })
  parentId: string;

  @Column({ type: DataType.TEXT })
  content: string;
}
