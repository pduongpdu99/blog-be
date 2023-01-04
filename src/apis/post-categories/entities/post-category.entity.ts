import { Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class PostCategory extends BaseEntity {
  @Column
  categoryId: number;

  @Column
  postId: number;
}
