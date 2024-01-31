import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { LikeService } from './like.service';
import { LikeRdo } from './rdo/like.rdo';
import { LikeDto } from './dto/like.dto';

@ApiTags('likes')
@Controller('publications/:publicationId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add like',
  })
  @Post('/')
  async create(
    @Param('publicationId') publicationId: string,
    @Body() dto: LikeDto
  ) {
    const newLike = await this.likeService.create(dto, publicationId);
    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Delete like',
  })
  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('publicationId') publicationId: string,
    @Body() dto: { data: LikeDto }
  ) {
    const { data } = dto;

    await this.likeService.remove(publicationId, data.userId);
  }
}
