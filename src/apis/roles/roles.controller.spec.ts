import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { RolesController } from './roles.controller';
import { RolesModule } from './roles.module';
import * as request from 'supertest';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

describe('RolesController', () => {
  let app: INestApplication;
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RolesModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
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
    describe('get all roles record', () => {
      it('getting all roles record', async () => {
        return request(app.getHttpServer()).get('/roles').expect(200);
      });
    });

    // Get by id
    describe('Get roles by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get roles record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/roles/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('POST http method', () => {
    const testcases: CreateRoleDto[] = [
      {
        id: 1,
        name: 'Super admin',
      },
      {
        id: 2,
        name: 'Admin',
      },
      {
        id: 3,
        name: 'Teacher',
      },
      {
        id: 4,
        name: 'Student',
      },
      {
        id: 5,
        name: 'User',
      },
    ];

    // create roles
    describe('create roles', () => {
      testcases.forEach((testcase) => {
        it(`create roles record`, async () => {
          return request(app.getHttpServer())
            .post(`/roles`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdateRoleDto[] = [
      {
        name: 'Super admin 1',
      },
      {
        name: 'Admin 1',
      },
      {
        name: 'Teacher 1',
      },
      {
        name: 'Student 1',
      },
      {
        name: 'User 1',
      },
    ];

    describe('update roles by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update roles record by id`, async () => {
          return request(app.getHttpServer())
            .patch(`/roles/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all roles ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove roles record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/roles/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });
});
