import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Post } from '../entities.index';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    { provide: PROVIDE_NAME.POST_REPOSITORY, useValue: Post },
  ],
})
export class PostsModule {}
