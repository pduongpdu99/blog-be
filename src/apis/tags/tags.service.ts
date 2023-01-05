import { Inject, Injectable } from '@nestjs/common';
import PROVIDE_NAME from 'src/common/provide-name';
import { BaseService } from '../bases/base.service';
import { Tag } from '../entities.index';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService extends BaseService<
  CreateTagDto,
  UpdateTagDto,
  number
> {
  constructor(
    @Inject(PROVIDE_NAME.TAG_REPOSITORY) private tagRepository: typeof Tag,
  ) {
    super(tagRepository);
  }
}
