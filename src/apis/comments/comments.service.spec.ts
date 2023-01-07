import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { Comment } from '../entities.index';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: PROVIDE_NAME.COMMENT_REPOSITORY, useValue: Comment },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
