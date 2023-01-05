import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Comment } from '../entities.index';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    { provide: PROVIDE_NAME.COMMENT_REPOSITORY, useValue: Comment },
  ],
})
export class CommentsModule {}
