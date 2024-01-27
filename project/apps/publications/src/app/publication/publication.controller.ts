import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PublicationType } from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { PublicationService } from './publication.service';
import {
  CreatePublicationDtoType,
  PublicationDto,
} from './dto/create-publication.dto';
import { PublicationRdo } from './rdo/publication.rdo';
import { UpdatePublicationDto } from './dto/edit-publication.dto';
import { PublicationWithPaginationRdo } from './rdo/publication-with-pagination.rdo';
import { PublicationQuery } from './query/publication.query';

@ApiTags('publications')
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all publications',
  })
  @Get()
  public async showAll(
    @Query() filter: PublicationQuery
  ): Promise<PublicationWithPaginationRdo> {
    const publications = await this.publicationService.getPublications(filter);

    const result = {
      ...publications,
      entities: publications.entities.map((post) => post.toPOJO()),
    };

    return fillDto(PublicationWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new user returns',
  })
  @Get(':id')
  public async show(
    @Param('id')
    id: string
  ) {
    const publication = await this.publicationService.getPublication(id);
    return fillDto(PublicationRdo, publication.toPOJO());
  }

  @ApiResponse({
    type: PublicationDto,
    status: HttpStatus.CREATED,
    description: 'The new publication has been created',
  })
  @Post('/')
  public async create(
    @Body()
    dto: CreatePublicationDtoType,
    @Query('type') type: PublicationType
  ) {
    const publication = await this.publicationService.createPublication(
      dto,
      type
    );

    return fillDto(PublicationRdo, publication.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete the publication',
  })
  @Delete(':id')
  public async delete(
    @Param('id')
    id: string
  ) {
    return await this.publicationService.deletePublication(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdatePublicationDto,
    description: 'Updates the publication',
  })
  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    updatePubDto: UpdatePublicationDto
  ) {
    const publication = await this.publicationService.updatePublication(
      id,
      updatePubDto
    );

    return fillDto(PublicationRdo, publication.toPOJO());
  }
}
