enum PostStatus {
  ACCEPT,
  REJECT,
  PENDING,
}
export class Post extends BaseEntity<string> {
  authorId: string;
  tagId: number;
  categoryId: number;

  title: string;
  description: string;
  content: string;
  status: PostStatus = PostStatus.PENDING;
}
