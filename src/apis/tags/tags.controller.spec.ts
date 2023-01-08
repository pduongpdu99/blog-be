import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { TagsController } from './tags.controller';
import { TagsModule } from './tags.module';
import * as request from 'supertest';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

describe('TagsController', () => {
  let app: INestApplication;
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TagsModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const testcases: CreateTagDto[] = [
      {
        id: 1,
        parentId: 0,
        title: 'Tieu de 1',
      },
      {
        id: 2,
        parentId: 0,
        title: 'Tieu de 1',
      },
      {
        id: 3,
        parentId: 0,
        title: 'Tieu de 1',
      },
      {
        id: 4,
        parentId: 0,
        title: 'Tieu de 1',
      },
      {
        id: 5,
        parentId: 0,
        title: 'Tieu de 1',
      },
    ];

    // create tags
    describe('create tags', () => {
      testcases.forEach((testcase) => {
        it(`create tags record`, async () => {
          return request(app.getHttpServer())
            .post(`/tags`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdateTagDto[] = [
      {
        parentId: 1,
      },
      {
        title: 'Pham 22',
      },
      {
        parentId: 0,
      },
      {
        title: '123',
      },
      {
        title: '0,1',
      },
    ];

    describe('update tags by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update tags record by id`, async () => {
          return request(app.getHttpServer())
            .patch(`/tags/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all tags record', () => {
      it('getting all tags record', async () => {
        return request(app.getHttpServer()).get('/tags').expect(200);
      });
    });

    // Get by id
    describe('Get tags by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get tags record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/tags/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all tags ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove tags record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/tags/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
