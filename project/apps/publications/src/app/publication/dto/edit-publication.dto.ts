import { ApiProperty } from '@nestjs/swagger';
import { PublicationState } from '@project/shared/shared-types';

export class UpdatePublicationDto {
  @ApiProperty({
    description: 'Author of the publication',
    example: 'author',
  })
  author: string;

  @ApiProperty({
    description: 'Creation date of the publication',
    example: new Date(),
  })
  dateOfCreation: Date;

  @ApiProperty({
    description: 'Date of the publication',
    example: new Date(),
  })
  dateOfPublication: Date;

  @ApiProperty({
    description: 'Id of the publication',
    example: 'id',
  })
  id: string;

  @ApiProperty({
    description: 'Initial author of the publication',
    example: 'author',
  })
  initialAuthor: string;

  @ApiProperty({
    description: 'Is publication a repost',
    example: false,
  })
  isRepost: boolean;

  @ApiProperty({
    description: 'Status of the publication',
    example: 'publication',
  })
  status: PublicationState;

  @ApiProperty({
    description: 'Tags of the publication',
    example: ['tags', 'tags2'],
  })
  tags?: string[];
}
