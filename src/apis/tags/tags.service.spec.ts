import { Test, TestingModule } from '@nestjs/testing';
import PROVIDE_NAME from 'src/common/provide-name';
import { Tag } from '../entities.index';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        { provide: PROVIDE_NAME.TAG_REPOSITORY, useValue: Tag },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
