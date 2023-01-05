import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { Question } from '../entities.index';
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { UpdateRoleDto } from '../roles/dto/update-role.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService extends BaseService<
  CreateQuestionDto,
  UpdateQuestionDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.QUESTION_REPOSITORY)
    questionRepository: typeof Question,
  ) {
    super(questionRepository);
  }
}
