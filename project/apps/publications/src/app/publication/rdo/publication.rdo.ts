import { ApiProperty } from '@nestjs/swagger';
import { Comment, Like, PublicationType, Tag } from '@prisma/client';

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
  public authorId: string;

  @ApiProperty({
    description: 'type of publication',
    example: 'video',
  })
  @Expose()
  public type: PublicationType;

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
    description: 'Is publication is repost',
    example: false,
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'Status of the publication',
    example: true,
  })
  @Expose()
  public isPublished: boolean;

  @ApiProperty({
    description: 'Tags of the publication',
    example: ['publication'],
  })
  @Expose()
  public tags: Tag[];

  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @Expose()
  public link?: string;

  @ApiProperty({
    description: 'just a few words about the resource',
    example: 'Your academy',
  })
  @Expose()
  public linkDescription?: string;

  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @Expose()
  public photo?: string;

  @ApiProperty({
    description: 'author of the quote',
    example: 'Jason Statham',
  })
  @Expose()
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'the quote',
    example: 'Today people worth less than their clothes',
  })
  @Expose()
  public quoteText?: string;

  @ApiProperty({
    description: 'announcement of the publication',
    example: 'take a look at the publication',
  })
  @Expose()
  public announcement?: string;

  @ApiProperty({
    description: 'main text of the publication',
    example: '',
  })
  @Expose()
  public announcementText?: string;

  @ApiProperty({
    description: 'title of the publication',
    example: 'publication title',
  })
  @Expose()
  public title?: string;

  @ApiProperty({
    description: 'link to the video',
    example: 'https://youtu.be/XqZsoesa55w?si=SzsSu7S0PVx2iMyX',
  })
  @Expose()
  public videoLink: string;

  @ApiProperty({
    description: "publication's comments",
    example: [{ id: 'id', value: 'value' }],
  })
  @Expose()
  public comments: Comment[];

  @ApiProperty({
    description: "publication's likes",
    example: [{ id: 'id', value: 'value', userId: 'user id' }],
  })
  @Expose()
  public likes: Like[];
}
