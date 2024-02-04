import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { LikeService } from './like.service';
import { LikeRdo } from './rdo/like.rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { RequestWithTokenPayload } from '@project/shared/shared-types';

@ApiTags('likes')
@Controller('publications/:publicationId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add like',
  })
  @UseGuards(CheckAuthGuard)
  @Post('/')
  async create(
    @Param('publicationId') publicationId: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    const newLike = await this.likeService.create(user.sub, publicationId);
    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Delete like',
  })
  @UseGuards(CheckAuthGuard)
  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('publicationId') publicationId: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    await this.likeService.remove(user.sub, publicationId);
  }
}
