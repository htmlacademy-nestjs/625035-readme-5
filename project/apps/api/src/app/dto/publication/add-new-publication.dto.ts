import { ApiProperty } from '@nestjs/swagger';
import { PublicationType } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

const LINK_DESCRIPTION_MAX_LENGTH = 300;

export class CreatePublicationDto {
  @ApiProperty({
    description: 'tags for the publication',
    example: ['tag, tagI'],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @IsNotEmpty()
  @IsUrl({})
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: 'just a few words about the resource',
    example: 'Your academy',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(LINK_DESCRIPTION_MAX_LENGTH)
  public linkDescription?: string;

  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @IsNotEmpty()
  @IsOptional()
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i))
  public photo?: string;

  @ApiProperty({
    description: 'author of the quote',
    example: 'Jason Statham',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'the quote',
    example: 'Today people worth less than their clothes',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public quoteText?: string;

  @ApiProperty({
    description: 'announcement of the publication',
    example: 'take a look at the publication',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public announcement?: string;

  @ApiProperty({
    description: 'main text of the publication',
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public announcementText?: string;

  @ApiProperty({
    description: 'title of the publication',
    example: 'publication title',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'link to the video',
    example: 'https://youtu.be/XqZsoesa55w?si=SzsSu7S0PVx2iMyX',
  })
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  public videoLink?: string;

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
