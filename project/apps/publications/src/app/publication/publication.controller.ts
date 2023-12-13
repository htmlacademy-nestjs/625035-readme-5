import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { fillDto } from '@project/shared/helpers';
import { PublicationService } from './publication.service';
import { Dto } from './dto/create-publication.dto';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  public async showAll() {}

  @Get(':id')
  public async show(
    @Param('id')
    id: string
  ) {}

  @Post('create')
  public async create(
    @Body()
    dto: Dto
  ) {
    this.publicationService.create(dto);
  }

  @Delete(':id')
  public async delete(
    @Param('id')
    id: string
  ) {}

  @Put(':id')
  public async update(
    @Param('id')
    id: string,
    @Body() updatePubDto: Dto
  ) {}
}
