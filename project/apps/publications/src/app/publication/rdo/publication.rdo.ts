import { ApiProperty } from '@nestjs/swagger';
import { PublicationState } from '@prisma/client';

import { Expose } from 'class-transformer';

export class PublicationRdo {
  @ApiProperty({
    description: 'Id of the publication',
    example: 'id',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Author of the publication',
    example: 'Author',
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: 'Date of creation of the publication',
    example: new Date(),
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Date of publication',
    example: new Date(),
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Initial author of the publication',
    example: 'Author',
  })
  @Expose()
  public initialAuthor: string;

  @ApiProperty({
    description: 'Is publication is repost',
    example: false,
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'Status of the publication',
    example: 'publication',
  })
  @Expose()
  public state: PublicationState;

  @ApiProperty({
    description: 'Tags of the publication',
    example: ['publication'],
  })
  @Expose()
  public tags: string;
}
