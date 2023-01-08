import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsController } from './permissions.controller';
import { PermissionsModule } from './permissions.module';
import * as request from 'supertest';

describe('PermissionsController', () => {
  let app: INestApplication;
  let controller: PermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PermissionsModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    app = module.createNestApplication();
    await app.init();
  });

  describe('Definition', () => {
    it('should be defined', () => {
      return expect(controller).toBeDefined();
    });
  });

  describe('POST http method', () => {
    const testcases: CreatePermissionDto[] = [
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
    ];

    // create permissions
    describe('create permissions', () => {
      testcases.forEach((testcase) => {
        it(`create permissions record`, async () => {
          return request(app.getHttpServer())
            .post(`/permissions`)
            .send(testcase)
            .expect(HttpStatus.CREATED);
        });
      });
    });
  });

  describe('PATCH http method', () => {
    const testcases: UpdatePermissionDto[] = [
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
      {
        roleId: 1,
        apiPath: 'abc/xyz',
      },
    ];

    describe('update permissions by id', () => {
      [1, 2, 3, 4, 5].forEach((id, index) => {
        it(`update permissions record by id`, () => {
          return request(app.getHttpServer())
            .patch(`/permissions/${id}`)
            .send(testcases[index])
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('GET http method', () => {
    // Get all
    describe('get all permissions record', () => {
      it('getting all permissions record', async () => {
        return request(app.getHttpServer()).get('/permissions').expect(200);
      });
    });

    // Get by id
    describe('Get permissions by id', () => {
      const testcases = [1, 2, 100000, 'abc', '12', 'x:x', 'duong@'];
      testcases.forEach((testcase) => {
        it(`get permissions record by id (testcase: ${testcase})`, () => {
          return request(app.getHttpServer())
            .get(`/permissions/${testcase}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  describe('DELETE http method', () => {
    describe('Remove all permissions ids created', () => {
      [1, 2, 3, 4, 5].forEach((id) => {
        it(`remove permissions record by id`, () => {
          return request(app.getHttpServer())
            .delete(`/permissions/${id}`)
            .expect(HttpStatus.OK);
        });
      });
    });
  });

  afterEach(() => {
    app.close();
  });
});
