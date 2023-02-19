import { PostsService } from './posts.service';
import { Controller } from '@nestjs/common/decorators';
import { BaseController } from '../bases/base.controller';

@Controller('posts')
export class PostsController extends BaseController {
  constructor(private readonly postsService: PostsService) {
    super(postsService);
  }
}
