import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { PostsController } from './posts.controller';
import { PostsModule } from './posts.module';
import * as request from 'supertest';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from './posts.enum';

describe('PostsController', () => {
  let app: INestApplication;
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostsModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const testcases: CreatePostDto[] = [
      {
        id: '1',
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: PostStatus.ACCEPT,
      },
      {
        id: '2',
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: PostStatus.ACCEPT,
      },
      {
        id: '3',
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: PostStatus.ACCEPT,
      },
      {
        id: '4',
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: PostStatus.ACCEPT,
      },
      {
        id: '5',
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: PostStatus.ACCEPT,
      },
    ];

    // create posts
    describe('create posts', () => {
      testcases.forEach((testcase) => {
        it(`create posts record`, async () => {
          return request(app.getHttpServer())
            .post(`/posts`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdatePostDto[] = [
      {
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: PostStatus.ACCEPT,
      },
      {
        title: 'test case 2',
      },
      {
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: PostStatus.PENDING,
      },
      {
        authorId: 'dsad',
        tagId: 1,
        categoryId: 1,
        title: 'fdsaf',
        description: 'fdsafdsa',
        content: 'fdsavdsavdsa',
        status: 4,
      },
      {
        title: 'test case 2',
      },
    ];

    describe('update posts by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update posts record by id`, async () => {
          return request(app.getHttpServer())
            .patch(`/posts/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all posts record', () => {
      it('getting all posts record', async () => {
        return request(app.getHttpServer()).get('/posts').expect(200);
      });
    });

    // Get by id
    describe('Get posts by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get posts record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/posts/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all posts ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove posts record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/posts/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
