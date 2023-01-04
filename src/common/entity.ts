import { Column, Model } from 'sequelize-typescript';
export class BaseEntity extends Model {
  @Column
  createdDate: number = new Date().getTime();

  @Column
  updatedDate: number = new Date().getTime();

  @Column
  deletedDate: number | null = null;

  @Column
  createdBy: string;

  @Column
  updatedBy: string | null;

  @Column
  deletedBy: string | null;
}
