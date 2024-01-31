import { ApiProperty } from '@nestjs/swagger';
import { PublicationType } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePublicationDto {
  @ApiProperty({
    description: 'tags for the publication',
    example: ['tagId, tagId2'],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  public tags?: string[];

  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @IsNotEmpty()
  @IsUrl({})
  public link?: string;

  @ApiProperty({
    description: 'just a few words about the resource',
    example: 'Your academy',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  public linkDescription?: string;

  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @IsNotEmpty()
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i))
  public photo?: string;

  @ApiProperty({
    description: 'author of the quote',
    example: 'Jason Statham',
  })
  @IsNotEmpty()
  @IsString()
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'the quote',
    example: 'Today people worth less than their clothes',
  })
  @IsNotEmpty()
  @IsString()
  public quoteText?: string;

  @ApiProperty({
    description: 'announcement of the publication',
    example: 'take a look at the publication',
  })
  @IsNotEmpty()
  @IsString()
  public announcement?: string;

  @ApiProperty({
    description: 'main text of the publication',
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  public announcementText?: string;

  @ApiProperty({
    description: 'title of the publication',
    example: 'publication title',
  })
  @IsNotEmpty()
  @IsString()
  public title?: string;

  @ApiProperty({
    description: 'link to the video',
    example: 'https://youtu.be/XqZsoesa55w?si=SzsSu7S0PVx2iMyX',
  })
  @IsNotEmpty()
  @IsUrl()
  public videoLink: string;

  @ApiProperty({
    description: 'author id',
    example: 'id',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'author id',
    example: 'id',
  })
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'type of publication',
    example: 'video',
  })
  @IsNotEmpty()
  type: PublicationType;
}
