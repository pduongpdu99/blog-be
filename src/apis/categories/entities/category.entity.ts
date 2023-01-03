export class Category extends BaseEntity<number> {
  parentId: number;

  title: string;
}
