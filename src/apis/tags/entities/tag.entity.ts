import { Table, Column } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';
@Table
export class Tag extends BaseEntity {
  @Column
  id: number;

  @Column
  parentId: number;

  @Column
  title: string;
}
