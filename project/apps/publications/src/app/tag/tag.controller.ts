import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRdo } from './rdo/tag.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Publication tag service')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create list of tags',
  })
  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const tagsEntity = await this.tagService.create(dto);
    const tags = tagsEntity.map((entity) => entity.toPOJO());

    return fillDto(TagRdo, tags);
  }

  @ApiResponse({
    description: 'Get tag by id',
  })
  @Get('/:id')
  public async showById(
    @Param('id')
    id: string
  ) {
    return fillDto(TagRdo, (await this.tagService.findById(id)).toPOJO());
  }
}
