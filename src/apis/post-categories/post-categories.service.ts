import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { PostCategory } from '../entities.index';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';

@Injectable()
export class PostCategoriesService extends BaseService<
  CreatePostCategoryDto,
  UpdatePostCategoryDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.POST_TAG_REPOSITORY)
    postCategoryRepository: typeof PostCategory,
  ) {
    super(postCategoryRepository);
  }
}
