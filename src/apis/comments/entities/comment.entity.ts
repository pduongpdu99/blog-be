export class Comment extends BaseEntity<number> {
  userId: string;
  questionId: number;
  parentId: number;
  
  content: string;
}
