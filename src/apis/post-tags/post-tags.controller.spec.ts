import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { PostTagsController } from './post-tags.controller';
import { PostTagsModule } from './post-tags.module';
import * as request from 'supertest';
import { CreatePostTagDto } from './dto/create-post-tag.dto';
import { UpdatePostTagDto } from './dto/update-post-tag.dto';

describe('PostTagsController', () => {
  let app: INestApplication;
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
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const testcases: CreatePostTagDto[] = [
      {
        id: 1,
        tagId: 1,
        postId: 1,
      },
      {
        id: 2,
        tagId: 1,
        postId: 1,
      },
      {
        id: 3,
        tagId: 1,
        postId: 1,
      },
      {
        id: 4,
        tagId: 1,
        postId: 1,
      },
      {
        id: 5,
        tagId: 1,
        postId: 1,
      },
    ];

    // create post-tags
    describe('create post-tags', () => {
      testcases.forEach((testcase) => {
        it(`create post-tags record`, async () => {
          return request(app.getHttpServer())
            .post(`/post-tags`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdatePostTagDto[] = [
      {
        id: 1,
        tagId: 1,
        postId: 1,
      },
      {
        id: 2,
        tagId: 2,
        postId: 2,
      },
      {
        id: 3,
        tagId: 3,
        postId: 1,
      },
      {
        id: 4,
        tagId: 4,
        postId: 2,
      },
      {
        id: 5,
        tagId: 3,
        postId: 2,
      },
    ];

    describe('update post-tags by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update post-tags record by id`, async () => {
          return request(app.getHttpServer())
            .patch(`/post-tags/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all post-tags record', () => {
      it('getting all post-tags record', async () => {
        return request(app.getHttpServer()).get('/post-tags').expect(200);
      });
    });

    // Get by id
    describe('Get post-tags by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get post-tags record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/post-tags/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all post-tags ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove post-tags record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/post-tags/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
