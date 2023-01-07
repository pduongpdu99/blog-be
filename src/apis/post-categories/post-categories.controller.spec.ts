import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { DatabaseModule } from 'src/database/module';
import { PostCategory } from '../entities.index';
import { PostCategoriesController } from './post-categories.controller';
import { PostCategoriesModule } from './post-categories.module';
import { PostCategoriesService } from './post-categories.service';

describe('PostCategoriesController', () => {
  let controller: PostCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostCategoriesModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<PostCategoriesController>(PostCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
