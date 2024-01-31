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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { PublicationService } from './publication.service';
import { CreatePublicationDtoType } from './dto/create-publication.dto';
import { PublicationRdo } from './rdo/publication.rdo';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationWithPaginationRdo } from './rdo/publication-with-pagination.rdo';
import { PublicationQuery } from './query/publication.query';
import { SearchQuery } from './query/search.query';
import { UserIdDto } from '../../../../api/src/app/dto/user-id.dto';
import { PublicationType } from '@prisma/client';

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
    status: HttpStatus.CREATED,
    description: 'The new publication has been created',
  })
  @Post('/')
  public async create(
    @Body()
    dto: CreatePublicationDtoType
  ) {
    const publication = await this.publicationService.createPublication(dto);

    return fillDto(PublicationRdo, publication.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete the publication',
  })
  @Delete(':id')
  public async delete(
    @Param('id')
    id: string,
    @Body()
    { userId }: UserIdDto
  ) {
    return await this.publicationService.deletePublication(id, userId);
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
    updatePubDto: UpdatePublicationDto,
    @Query('type')
    type: PublicationType
  ) {
    const publication = await this.publicationService.updatePublication(
      id,
      updatePubDto,
      type
    );

    return fillDto(PublicationRdo, publication.toPOJO());
  }

  @ApiResponse({
    type: SearchQuery,
    status: HttpStatus.OK,
    description: 'search for the publication',
  })
  @Get('/search')
  public async search(
    @Query()
    query: SearchQuery
  ) {
    const result = await this.publicationService.searchPublications(
      query.title
    );

    return fillDto(
      PublicationRdo,
      result.map((publication) => publication.toPOJO())
    );
  }
}
