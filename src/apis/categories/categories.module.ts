import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Category } from '../entities.index';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    { provide: PROVIDE_NAME.CATEGORY_REPOSITORY, useValue: Category },
  ],
})
export class CategoriesModule {}
