import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostCategory } from '../entities.index';
import { PostCategoriesService } from './post-categories.service';

describe('PostCategoriesService', () => {
  let service: PostCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostCategoriesService,
        {
          provide: PROVIDE_NAME.POST_CATEGORY_REPOSITORY,
          useValue: PostCategory,
        },
      ],
    }).compile();

    service = module.get<PostCategoriesService>(PostCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
