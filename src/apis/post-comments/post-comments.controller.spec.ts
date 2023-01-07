import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { PostComment } from '../entities.index';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsService } from './post-comments.service';

describe('PostCommentsController', () => {
  let controller: PostCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCommentsController],
      providers: [
        PostCommentsService,
        {
          provide: PROVIDE_NAME.POST_COMMENT_REPOSITORY,
          useValue: PostComment,
        },
      ],
    }).compile();

    controller = module.get<PostCommentsController>(PostCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
