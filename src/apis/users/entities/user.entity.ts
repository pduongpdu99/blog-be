import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/entity';

@Table
export class User extends BaseEntity {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.BIGINT, defaultValue: 0 })
  roleId?: number = 0;

  @Column({ type: DataType.STRING, defaultValue: null })
  categoryIds: string | null = null;

  @Column({ type: DataType.STRING(10) })
  firstname: string;

  @Column({ type: DataType.STRING(10), allowNull: true })
  middlename?: string;

  @Column({ type: DataType.STRING(10) })
  lastname: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  hash: string;

  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken?: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  bio?: string;

  @Column({
    type: DataType.STRING,
    defaultValue: new Date(new Date().getTime() + 1 * 24 * 3600),
    allowNull: true,
  })
  expireIns: string;
}
