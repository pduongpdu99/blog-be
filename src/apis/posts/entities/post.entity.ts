import { Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

enum PostStatus {
  ACCEPT,
  REJECT,
  PENDING,
}

@Table
export class Post extends BaseEntity<string> {
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
