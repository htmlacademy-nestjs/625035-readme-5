import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { PublicationService } from './publication.service';
import { PublicationDto } from './dto/create-publication.dto';
import { PublicationRdo } from './rdo/publication.rdo';
import { UpdatePublicationDto } from './dto/edit-publication.dto';

@ApiTags('publications')
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all publications',
  })
  @Get()
  public async showAll() {
    const publications = await this.publicationService.getPublications();

    return fillDto(
      PublicationRdo,
      publications.map((publication) => publication.toPOJO())
    );
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
  @Post('create')
  public async create(
    @Body()
    dto: PublicationDto
  ) {
    // todo: make correct response here
    const publication = await this.publicationService.create(dto);

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
  @Put(':id')
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
