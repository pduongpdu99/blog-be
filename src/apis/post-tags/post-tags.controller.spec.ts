import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostTag } from '../entities.index';
import { PostTagsController } from './post-tags.controller';
import { PostTagsService } from './post-tags.service';

describe('PostTagsController', () => {
  let controller: PostTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTagsController],
      providers: [
        PostTagsService,
        { provide: PROVIDE_NAME.POST_TAG_REPOSITORY, useValue: PostTag },
      ],
    }).compile();

    controller = module.get<PostTagsController>(PostTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
