import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { CommentsController } from './comments.controller';
import { CommentsModule } from './comments.module';
import * as request from 'supertest';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentsController', () => {
  let app: INestApplication;
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommentsModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const testcases: CreateCommentDto[] = [
      {
        id: 1,
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        id: 2,
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        id: 3,
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        id: 4,
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        id: 5,
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
    ];

    // create comments
    describe('create comments', () => {
      testcases.forEach((testcase) => {
        it(`create comments record`, async () => {
          return request(app.getHttpServer())
            .post(`/comments`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdateCommentDto[] = [
      {
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
      {
        userId: '1',
        questionId: 1,
        parentId: 1,
        content: 'hello world',
      },
    ];

    describe('update comments by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update comments record by id`, () => {
          return request(app.getHttpServer())
            .patch(`/comments/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all comments record', () => {
      it('getting all comments record', async () => {
        return request(app.getHttpServer()).get('/comments').expect(200);
      });
    });

    // Get by id
    describe('Get comments by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get comments record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/comments/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all comments ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove comments record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/comments/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
