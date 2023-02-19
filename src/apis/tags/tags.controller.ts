import { Controller } from '@nestjs/common';
import { TagsService } from './tags.service';
import { BaseController } from '../bases/base.controller';

@Controller('tags')
export class TagsController extends BaseController {
  constructor(private readonly tagsService: TagsService) {
    super(tagsService);
  }
}
