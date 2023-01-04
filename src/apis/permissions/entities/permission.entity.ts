import { AutoIncrement, Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Permission extends BaseEntity {
  @Column
  @AutoIncrement
  id: number;

  @Column
  roleId: number;

  @Column
  apiPath: string;
}
