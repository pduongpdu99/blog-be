import { AutoIncrement, Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Category extends BaseEntity {
  @Column
  @AutoIncrement
  id: number;

  @Column
  parentId: number;

  @Column
  title: string;
}
