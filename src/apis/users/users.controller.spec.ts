import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UsersModule } from './users.module';
import { DatabaseModule } from 'src/database/module';
import { ConfigModule } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const hash = '$2a$10$2GWv9PAx1Mf235NxSUzLZuJmtKkC8nKkGEx9GCwwCy4PYE2OmUOKS';

    const testcases: CreateUserDto[] = [
      {
        id: '1',
        firstname: 'Duong 1',
        lastname: 'Pham 1',
        email: 'pduongpdu991@gmail.com',
        hash: hash,
        categoryIds: null,
      },
      {
        id: '2',
        firstname: 'Duong 2',
        lastname: 'Pham 2',
        email: 'pduongpdu992@gmail.com',
        hash: hash,
        categoryIds: null,
      },
      {
        id: '3',
        firstname: 'Duong 3',
        lastname: 'Pham 3',
        email: 'pduongpdu993@gmail.com',
        hash: hash,
        categoryIds: null,
      },
      {
        id: '4',
        firstname: 'Duong 3',
        lastname: 'Pham 3',
        email: 'pduongpdu994@gmail.com',
        hash: hash,
        categoryIds: null,
      },
      {
        id: '5',
        firstname: 'Duong 4',
        lastname: 'Pham 4',
        email: 'pduongpdu995@gmail.com',
        hash: hash,
        categoryIds: null,
      },
    ];

    // create user
    describe('create user', () => {
      testcases.forEach((testcase) => {
        it(`create user record`, async () => {
          return request(app.getHttpServer())
            .post(`/users`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const hash = '$2a$10$2GWv9PAx1Mf235NxSUzLZuJmtKkC8nKkGEx9GCwwCy4PYE2OmUOKS';

    const testcases: UpdateUserDto[] = [
      {
        firstname: 'Duong 11',
      },
      {
        lastname: 'Pham 22',
      },
      {
        email: 'pduongpdu101@gmail.com',
      },
      {
        hash: hash,
      },
      {
        categoryIds: '0,1',
      },
    ];

    describe('update user by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update user record by id`, async () => {
          return request(app.getHttpServer())
            .patch(`/users/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all user record', () => {
      it('getting all user record', async () => {
        return request(app.getHttpServer()).get('/users').expect(200);
      });
    });

    // Get by id
    describe('Get user by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get user record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/users/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all user ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove user record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/users/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
