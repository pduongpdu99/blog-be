import { Column, Table } from "sequelize-typescript";
import { BaseEntity } from "src/common/entity";

@Table
export class PostTag extends BaseEntity<number> {
  @Column
  tagId: number;
  
  @Column
  postId: number;
}
