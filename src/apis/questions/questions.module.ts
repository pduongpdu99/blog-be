import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Question } from '../entities.index';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    { provide: PROVIDE_NAME.QUESTION_REPOSITORY, useValue: Question },
  ],
})
export class QuestionsModule {}
