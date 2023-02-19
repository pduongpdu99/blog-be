import { Controller } from '@nestjs/common';
import { PostTagsService } from './post-tags.service';
import { BaseController } from '../bases/base.controller';

@Controller('post-tags')
export class PostTagsController extends BaseController {
  constructor(private readonly postTagsService: PostTagsService) {
    super(postTagsService);
  }
}
