import { Controller } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { BaseController } from '../bases/base.controller';

@Controller('post-comments')
export class PostCommentsController extends BaseController {
  constructor(private readonly postCommentsService: PostCommentsService) {
    super(postCommentsService);
  }
}
