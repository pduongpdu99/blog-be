import { Inject, Injectable, Post } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService extends BaseService<
  CreatePostDto,
  UpdatePostDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.POST_REPOSITORY)
    postRepository: typeof Post,
  ) {
    super(postRepository);
  }
}
