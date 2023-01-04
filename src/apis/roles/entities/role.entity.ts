import { AutoIncrement, Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Role extends BaseEntity {
  @Column
  id: number;

  @Column
  name: string;
}
