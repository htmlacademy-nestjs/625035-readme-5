import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagRepository } from './tag.repository';
import { PublicationService } from '../publication/publication.service';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject(forwardRef(() => PublicationService))
    private readonly publicationService: PublicationService,
    private readonly tagRepository: TagRepository
  ) {}

  public async create(
    publicationId: string,
    createTagDtos: CreateTagDto[]
  ): Promise<TagEntity[]> {
    const existPublication = await this.publicationService.getPublication(
      publicationId
    );

    const newTags = createTagDtos.map((dto) =>
      TagEntity.fromDto(dto, existPublication.id)
    );

    return this.tagRepository.saveTags(newTags);
  }

  public async findAll(publicationId: string) {
    return this.tagRepository.findByPublicationId(publicationId);
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
