import { Column, Table } from "sequelize-typescript";
import { BaseEntity } from "src/common/entity";

@Table
export class PostComment extends BaseEntity {
  @Column
  id: string;

  @Column
  postId: string;

  @Column
  parentId: string;

  @Column
  content: string;
}
