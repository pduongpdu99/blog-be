import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';
import { PostStatus } from '../posts.enum';

@Table
export class Post extends BaseEntity {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.UUID })
  authorId: string;

  @Column({ type: DataType.BIGINT })
  tagId: number;

  @Column({ type: DataType.BIGINT })
  categoryId: number;

  @Column({ type: DataType.STRING(50) })
  title: string;

  @Column({ type: DataType.STRING(200) })
  description: string;

  @Column({ type: DataType.TEXT })
  content: string;

  @Column
  status: PostStatus = PostStatus.PENDING;
}
