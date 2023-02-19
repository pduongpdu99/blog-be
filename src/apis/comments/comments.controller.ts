import { Controller } from '@nestjs/common';
import { BaseController } from '../bases/base.controller';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController extends BaseController {
  constructor(private readonly commentsService: CommentsService) {
    super(commentsService);
  }
}
