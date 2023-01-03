import { Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class PostCategory extends BaseEntity<number> {
  @Column
  categoryId: number;

  @Column
  postId: number;
}
