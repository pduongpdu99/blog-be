import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostCategory } from '../entities.index';
import { PostCategoriesController } from './post-categories.controller';
import { PostCategoriesService } from './post-categories.service';

describe('PostCategoriesController', () => {
  let controller: PostCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCategoriesController],
      providers: [
        PostCategoriesService,
        {
          provide: PROVIDE_NAME.POST_CATEGORY_REPOSITORY,
          useValue: PostCategory,
        },
      ],
    }).compile();

    controller = module.get<PostCategoriesController>(PostCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
