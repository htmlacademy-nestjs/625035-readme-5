import { PublicationType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Length, Matches, IsMongoId, IsIn } from 'class-validator';

import { SortByQuery } from '@project/shared/shared-types';

import {
  PublicationValidationMessage,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_BY_FIELD,
  PublicationValidationParams,
} from '../publication.constant';

export class PublicationQuery {
  @ApiProperty({
    description: 'The id of publication author',
    example: '1233-5784-3434-3434',
  })
  @IsOptional()
  @IsMongoId({ message: PublicationValidationMessage.userId.invalidFormat })
  public userId?: string;

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
  @IsOptional()
  @Length(
    PublicationValidationParams.tags.length.min,
    PublicationValidationParams.tags.length.max,
    { message: PublicationValidationMessage.tags.invalidLength }
  )
  @Matches(PublicationValidationParams.tags.valueFormat, {
    message: PublicationValidationMessage.tags.invalidFormat,
  })
  public tag?: string;

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
