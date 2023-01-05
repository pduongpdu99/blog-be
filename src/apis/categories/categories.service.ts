import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { Category } from '../entities.index';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService extends BaseService<
  CreateCategoryDto,
  UpdateCategoryDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.CATEGORY_REPOSITORY)
    categoryRepository: typeof Category,
  ) {
    super(categoryRepository);
  }
}
