import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class PostComment extends BaseEntity {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.UUID })
  postId: string;

  @Column({ type: DataType.UUID })
  parentId: string;

  @Column({ type: DataType.TEXT })
  content: string;
}
