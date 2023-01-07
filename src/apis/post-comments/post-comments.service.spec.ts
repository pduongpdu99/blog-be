import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostComment } from '../entities.index';
import { PostCommentsService } from './post-comments.service';

describe('PostCommentsService', () => {
  let service: PostCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostCommentsService,
        {
          provide: PROVIDE_NAME.POST_COMMENT_REPOSITORY,
          useValue: PostComment,
        },
      ],
    }).compile();

    service = module.get<PostCommentsService>(PostCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
