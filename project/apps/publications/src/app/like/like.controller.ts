import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { LikeService } from './like.service';

import { fillDto } from '@project/shared/helpers';
import { LikeRdo } from './rdo/like.rdo';
import { ApiTags } from '@nestjs/swagger';
import { TokenPayload } from '@project/shared/shared-types';

@ApiTags('likes')
@Controller('publications/:publicationId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/')
  async create(
    @Param('publicationId') publicationId: string,
    @Req() { sub }: TokenPayload
  ) {
    console.log('sub', sub);

    const newLike = await this.likeService.create({
      publicationId,
      userId: sub,
    });
    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('publicationId') publicationId: string,
    @Req() { sub }: TokenPayload
  ) {
    await this.likeService.remove(publicationId, sub);
  }
}
