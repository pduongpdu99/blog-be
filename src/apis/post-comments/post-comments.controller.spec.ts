import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsModule } from './post-comments.module';
import * as request from 'supertest';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

describe('PostCommentsController', () => {
  let app: INestApplication;
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
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const testcases: CreatePostCommentDto[] = [
      {
        id: '1',
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        id: '2',
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        id: '3',
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        id: '4',
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        id: '5',
        postId: '1:x',
        parentId: '1:c',
        content: 'dsahd jkshajkd hsajk dsa',
      },
    ];

    // create post-comments
    describe('create post-comments', () => {
      testcases.forEach((testcase) => {
        it(`create post-comments record`, async () => {
          return request(app.getHttpServer())
            .post(`/post-comments`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdatePostCommentDto[] = [
      {
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
      {
        postId: '1',
        parentId: '1',
        content: 'dsahd jkshajkd hsajk dsa',
      },
    ];

    describe('update post-comments by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update post-comments record by id`, () => {
          return request(app.getHttpServer())
            .patch(`/post-comments/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all post-comments record', () => {
      it('getting all post-comments record', async () => {
        return request(app.getHttpServer()).get('/post-comments').expect(200);
      });
    });

    // Get by id
    describe('Get post-comments by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get post-comments record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/post-comments/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all post-comments ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove post-comments record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/post-comments/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
