import { Model } from 'sequelize-typescript';
export class BaseEntity<T> extends Model {
  id: T;

  createdDate: Date | string;
  updatedDate: Date | string;
  deletedDate: Date | string;

  createdBy: string;
  updatedBy: string;
  deletedBy: string;
}
