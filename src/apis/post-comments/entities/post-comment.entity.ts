export class PostComment extends BaseEntity<string> {
  postId: string;
  parentId: string;

  content: string;
}
