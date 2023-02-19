import { Module } from '@nestjs/common';
import { PostTagsService } from './post-tags.service';
import { PostTagsController } from './post-tags.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostTag } from '../entities.index';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PostTagsController],
  providers: [
    PostTagsService,
    JwtService,
    { provide: PROVIDE_NAME.POST_TAG_REPOSITORY, useValue: PostTag },
  ],
})
export class PostTagsModule {}
