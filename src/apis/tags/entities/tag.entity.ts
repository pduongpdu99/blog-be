import { Table, Column } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';
@Table
export class Tag extends BaseEntity {
  @Column
  parentId: number;

  @Column
  title: string;
}
