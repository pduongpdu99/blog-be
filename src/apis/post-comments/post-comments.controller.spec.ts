import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsModule } from './post-comments.module';

describe('PostCommentsController', () => {
  let controller: PostCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostCommentsModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<PostCommentsController>(PostCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
