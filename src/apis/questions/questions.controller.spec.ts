import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { QuestionsController } from './questions.controller';
import { QuestionsModule } from './questions.module';
import * as request from 'supertest';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

describe('QuestionsController', () => {
  let app: INestApplication;
  let controller: QuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        QuestionsModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all questions record', () => {
      it('getting all questions record', async () => {
        return request(app.getHttpServer()).get('/questions').expect(200);
      });
    });

    // Get by id
    describe('Get questions by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get questions record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/questions/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('POST http method', () => {
    const testcases: CreateQuestionDto[] = [
      {
        id: 1,
        userId: '1',
        title: 'test case 1',
        describe: 'describe test case 1',
      },
      {
        id: 2,
        userId: '1',
        title: 'test case 1',
        describe: 'describe test case 1',
      },
      {
        id: 3,
        userId: '1',
        title: 'test case 1',
        describe: 'describe test case 1',
      },
      {
        id: 4,
        userId: '1',
        title: 'test case 1',
        describe: 'describe test case 1',
      },
      {
        id: 5,
        userId: '1',
        title: 'test case 1',
        describe: 'describe test case 1',
      },
    ];

    // create questions
    describe('create questions', () => {
      testcases.forEach((testcase) => {
        it(`create questions record`, async () => {
          return request(app.getHttpServer())
            .post(`/questions`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdateQuestionDto[] = [
      {
        userId: '2',
      },
      {
        title: 'test case 2',
      },
      {
        describe: 'describe test case 2',
      },
      {
        userId: '2',
      },
      {
        title: 'test case 2',
      },
    ];

    describe('update questions by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update questions record by id`, async () => {
          return request(app.getHttpServer())
            .patch(`/questions/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all questions ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove questions record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/questions/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });
});
