import { Controller } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { BaseController } from '../bases/base.controller';

@Controller('questions')
export class QuestionsController extends BaseController {
  constructor(private readonly questionsService: QuestionsService) {
    super(questionsService);
  }
}
