import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { Comment } from '../entities.index';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService extends BaseService<
  CreateCommentDto,
  UpdateCommentDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.PERMISSION_REPOSITORY)
    commentRepository: typeof Comment,
  ) {
    super(commentRepository);
  }
}
