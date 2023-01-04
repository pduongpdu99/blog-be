import { AutoIncrement, Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class PostCategory extends BaseEntity {
  @Column
  @AutoIncrement
  id: number;

  @Column
  categoryId: number;

  @Column
  postId: number;
}
