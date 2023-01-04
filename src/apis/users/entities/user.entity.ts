import { Table, Column } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class User extends BaseEntity {
  @Column
  roleId: number = 0;

  @Column
  categoryId: number;

  @Column
  firstname: string;

  @Column
  middlename: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  hash: string;

  @Column
  bio: string;
}
