import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { Tag } from '../entities.index';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

describe('TagsController', () => {
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        { provide: PROVIDE_NAME.TAG_REPOSITORY, useValue: Tag },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
