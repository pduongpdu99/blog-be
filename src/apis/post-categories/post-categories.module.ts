import { Module } from '@nestjs/common';
import { PostCategoriesService } from './post-categories.service';
import { PostCategoriesController } from './post-categories.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostCategory } from '../entities.index';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PostCategoriesController],
  providers: [
    PostCategoriesService,
    JwtService,
    { provide: PROVIDE_NAME.POST_CATEGORY_REPOSITORY, useValue: PostCategory },
  ],
})
export class PostCategoriesModule {}
