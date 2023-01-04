import { AutoIncrement, Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class PostTag extends BaseEntity {
  @Column
  @AutoIncrement
  id: number;

  @Column
  tagId: number;

  @Column
  postId: number;
}
