import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostTag } from '../entities.index';
import { PostTagsService } from './post-tags.service';

describe('PostTagsService', () => {
  let service: PostTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostTagsService,
        { provide: PROVIDE_NAME.POST_TAG_REPOSITORY, useValue: PostTag },
      ],
    }).compile();

    service = module.get<PostTagsService>(PostTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
