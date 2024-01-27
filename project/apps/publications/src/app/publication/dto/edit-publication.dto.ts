import { ApiProperty } from '@nestjs/swagger';
import { PublicationType } from '@prisma/client';
import { Tag } from '@project/shared/shared-types';

// todo: update with validation
// todo: add fields description for swagger
export class UpdatePublicationDto {
  @ApiProperty({
    description: 'Author of the publication',
    example: 'author',
  })
  userId: string;

  @ApiProperty({
    description: 'Creation date of the publication',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of the publication',
    example: new Date(),
  })
  updatedAt: Date;

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
    example: true,
  })
  isPublished: boolean;

  @ApiProperty({
    description: 'Tags of the publication',
    example: ['tagId1', 'tagsId2'],
  })
  tags?: string[];

  @ApiProperty({
    description: 'Type of the publication',
    example: PublicationType.link,
  })
  type: PublicationType;

  title?: string;
  videoLink?: string;
  announcement?: string;
  announcementText?: string;
  quoteAuthor?: string;
  quoteText?: string;
  photo?: File;
  link?: string;
  linkDescription?: string;
}
