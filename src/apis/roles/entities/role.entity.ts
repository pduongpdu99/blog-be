import { Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Role extends BaseEntity<number> {
  @Column
  name: string;
}
