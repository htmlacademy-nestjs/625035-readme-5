import { ApiProperty } from '@nestjs/swagger';
import { PublicationType } from '@prisma/client';
import { SortByQuery } from '@project/shared/shared-types';
import { Transform } from 'class-transformer';
import { IsIn, IsMongoId, IsOptional, Length, Matches } from 'class-validator';

export class PublicationQuery {
  @ApiProperty({
    description: 'The id of publication author',
    example: 'id',
  })
  @IsOptional()
  @IsMongoId()
  public authorId?: string;

  @ApiProperty({
    description: 'Publication type',
    example: 'video',
  })
  @IsOptional()
  @IsIn(Object.values(PublicationType), {
    message: 'wrong publication type',
  })
  public type?: PublicationType;

  @ApiProperty({
    description: 'Publication tag id',
    example: 'id',
  })
  @IsOptional()
  @Length(3, 10, { message: 'invalid length of tag' })
  @Matches(/^\D\S*$/i, {
    message: 'invalid tag format',
  })
  public tag?: string;

  @ApiProperty({
    description: 'Page number',
    example: '2',
  })
  @IsOptional()
  @Transform(({ value }) => +value || 1)
  public page?: number = 1;

  @ApiProperty({
    description: 'SortBy field',
    example: 'comments',
  })
  @IsOptional()
  public sortBy?: SortByQuery = 'createdAt';
}
