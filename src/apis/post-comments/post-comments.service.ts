import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { PostComment } from '../entities.index';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Injectable()
export class PostCommentsService extends BaseService<
  CreatePostCommentDto,
  UpdatePostCommentDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.POST_COMMENT_REPOSITORY)
    postCommentRepository: typeof PostComment,
  ) {
    super(postCommentRepository);
  }
}
