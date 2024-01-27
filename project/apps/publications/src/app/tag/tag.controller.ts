import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRdo } from './rdo/tag.rdo';

@Controller('publications/:publicationId/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/')
  public async create(
    @Param('publicationId') publicationId: string,
    @Body() dtos: CreateTagDto[]
  ) {
    const tags = await this.tagService.create(publicationId, dtos);

    return fillDto(
      TagRdo,
      tags.map((tag) => tag.toPOJO())
    );
  }

  @Get('/')
  public async show(@Param('publicationId') publicationId: string) {
    const tags = await this.tagService.findAll(publicationId);

    return fillDto(
      TagRdo,
      tags.map((tag) => tag.toPOJO())
    );
  }
}
