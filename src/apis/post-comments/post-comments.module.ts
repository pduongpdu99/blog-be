import { Module } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsController } from './post-comments.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostComment } from '../entities.index';

@Module({
  controllers: [PostCommentsController],
  providers: [
    PostCommentsService,
    { provide: PROVIDE_NAME.POST_COMMENT_REPOSITORY, useValue: PostComment },
  ],
})
export class PostCommentsModule {}
