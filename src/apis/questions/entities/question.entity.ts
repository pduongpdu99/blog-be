import { AutoIncrement, Column, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class Question extends BaseEntity {
  @Column
  id: number;

  @Column
  userId: string;

  @Column
  title: string;

  @Column
  describe: string;
}
