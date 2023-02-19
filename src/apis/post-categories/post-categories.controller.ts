import { Controller } from '@nestjs/common';
import { BaseController } from '../bases/base.controller';
import { PostCategoriesService } from './post-categories.service';

@Controller('post-categories')
export class PostCategoriesController extends BaseController {
  constructor(private readonly postCategoriesService: PostCategoriesService) {
    super(postCategoriesService);
  }
}
