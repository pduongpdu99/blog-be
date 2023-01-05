import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import PROVIDE_NAME from 'src/common/provide-name';
import { Tag } from '../entities.index';

@Module({
  controllers: [TagsController],
  providers: [
    TagsService,
    { provide: PROVIDE_NAME.TAG_REPOSITORY, useValue: Tag },
  ],
})
export class TagsModule {}
