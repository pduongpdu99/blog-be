import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { PostTagsController } from './post-tags.controller';
import { PostTagsModule } from './post-tags.module';

describe('PostTagsController', () => {
  let controller: PostTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostTagsModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<PostTagsController>(PostTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
