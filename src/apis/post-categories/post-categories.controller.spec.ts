import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { PostCategoriesController } from './post-categories.controller';
import { PostCategoriesModule } from './post-categories.module';
import * as request from 'supertest';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';

describe('PostCategoriesController', () => {
  let app: INestApplication;
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
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const testcases: CreatePostCategoryDto[] = [
      {
        id: 1,
        categoryId: 1,
        postId: 2,
      },
      {
        id: 2,
        categoryId: 2,
        postId: 3,
      },
      {
        id: 3,
        categoryId: 4,
        postId: 5,
      },
      {
        id: 4,
        categoryId: 6,
        postId: 7,
      },
      {
        id: 5,
        categoryId: 8,
        postId: 9,
      },
    ];

    // create post-categories
    describe('create post-categories', () => {
      testcases.forEach((testcase) => {
        it(`create post-categories record`, async () => {
          return request(app.getHttpServer())
            .post(`/post-categories`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdatePostCategoryDto[] = [
      {
        categoryId: 8,
        postId: 9,
      },
      {
        categoryId: 6,
        postId: 7,
      },
      {
        categoryId: 4,
        postId: 5,
      },
      {
        categoryId: 1,
        postId: 2,
      },
      {
        categoryId: 2,
        postId: 3,
      },
    ];

    describe('update post-categories by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update post-categories record by id`, () => {
          return request(app.getHttpServer())
            .patch(`/post-categories/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all post-categories record', () => {
      it('getting all post-categories record', async () => {
        return request(app.getHttpServer()).get('/post-categories').expect(200);
      });
    });

    // Get by id
    describe('Get post-categories by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get post-categories record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/post-categories/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all post-categories ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove post-categories record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/post-categories/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
