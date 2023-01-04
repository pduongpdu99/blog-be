import { AutoIncrement, Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Comment extends BaseEntity {
  @Column
  id: number;

  @Column
  userId: string;

  @Column
  questionId: number;

  @Column
  parentId: number;

  @Column
  content: string;
}
