import { Table, Column, AutoIncrement } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';
@Table
export class Tag extends BaseEntity {
  @Column
  @AutoIncrement
  id: number;

  @Column
  parentId: number;

  @Column
  title: string;
}
