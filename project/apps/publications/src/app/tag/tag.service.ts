import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagRepository } from './tag.repository';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  public async create(createTagDto: CreateTagDto): Promise<TagEntity[]> {
    const tags = await this.tagRepository.saveTags(createTagDto);

    return tags;
  }

  public async findById(tagId: string) {
    return this.tagRepository.findById(tagId);
  }

  public async findByIds(ids: string[]): Promise<TagEntity[]> {
    const tags = await this.tagRepository.findByIds(ids);

    if (tags.length !== ids.length) {
      const foundTagIds = tags.map((tag) => tag.id);
      const notFoundTagIds = ids.filter(
        (tagId) => !foundTagIds.includes(tagId)
      );

      if (!!notFoundTagIds.length) {
        throw new NotFoundException(
          `Tags with ids ${notFoundTagIds.join(', ')} not found.`
        );
      }
    }

    return tags;
  }
}
