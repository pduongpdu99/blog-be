import { Column, DataType, Model } from 'sequelize-typescript';
export class BaseEntity extends Model {
  @Column({ type: DataType.BIGINT })
  createdDate: number = new Date().getTime();

  @Column({ type: DataType.BIGINT })
  updatedDate: number = new Date().getTime();

  @Column({ type: DataType.BIGINT })
  deletedDate: number | null = null;

  @Column
  createdBy: string | null;

  @Column
  updatedBy: string | null;

  @Column
  deletedBy: string | null;
}
