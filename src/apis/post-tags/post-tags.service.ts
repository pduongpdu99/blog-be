import { Inject, Injectable, Post } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { PostTag } from '../entities.index';
import { CreatePostTagDto } from './dto/create-post-tag.dto';
import { UpdatePostTagDto } from './dto/update-post-tag.dto';

@Injectable()
export class PostTagsService extends BaseService<
  CreatePostTagDto,
  UpdatePostTagDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.POST_TAG_REPOSITORY)
    postTagRepository: typeof PostTag,
  ) {
    super(postTagRepository);
  }
}
