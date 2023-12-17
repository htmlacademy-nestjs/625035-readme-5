import { ApiProperty } from '@nestjs/swagger';
import { PublicationState } from '@project/shared/shared-types';
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
  public dateOfCreation: string;

  @ApiProperty({
    description: 'Date of publication',
    example: new Date(),
  })
  @Expose()
  public dateOfPublication: string;

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
  public status: PublicationState;

  @ApiProperty({
    description: 'Tags of the publication',
    example: ['publication'],
  })
  @Expose()
  public tags: string;
}
