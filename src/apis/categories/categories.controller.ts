import { Controller } from '@nestjs/common';
import { BaseController } from '../bases/base.controller';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController extends BaseController {
  constructor(private readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
