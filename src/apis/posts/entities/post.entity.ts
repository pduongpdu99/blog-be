import { Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';
import { PostStatus } from '../posts.enum';

@Table
export class Post extends BaseEntity {
  @Column
  id?: string;

  @Column
  authorId: string;

  @Column
  tagId: number;

  @Column
  categoryId: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  content: string;

  @Column
  status: PostStatus = PostStatus.PENDING;
}
