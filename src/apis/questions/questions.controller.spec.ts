import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/module';
import { QuestionsController } from './questions.controller';
import { QuestionsModule } from './questions.module';

describe('QuestionsController', () => {
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
