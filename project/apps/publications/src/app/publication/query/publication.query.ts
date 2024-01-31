import { PublicationType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsMongoId, IsIn, IsUUID, IsArray } from 'class-validator';

import { SortByQuery } from '@project/shared/shared-types';

import {
  PublicationValidationMessage,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_BY_FIELD,
} from '../publication.constant';

export class PublicationQuery {
  @ApiProperty({
    description: 'The id of publication author',
    example: 'id',
  })
  @IsOptional()
  @IsMongoId({ message: PublicationValidationMessage.userId.invalidFormat })
  public authorId?: string;

  @ApiProperty({
    description: 'Publication type',
    example: 'video',
  })
  @IsOptional()
  @IsIn(Object.values(PublicationType), {
    message: PublicationValidationMessage.type.invalidFormat,
  })
  public type?: PublicationType;

  @ApiProperty({
    description: 'Publication tag id',
    example: 'id',
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'Page number',
    example: '2',
  })
  @IsOptional()
  @Transform(({ value }) => +value || DEFAULT_PAGE_NUMBER)
  public page?: number = DEFAULT_PAGE_NUMBER;

  @ApiProperty({
    description: 'SortBy field',
    example: 'comments',
  })
  @IsOptional()
  public sortBy?: SortByQuery = DEFAULT_SORT_BY_FIELD;
}
