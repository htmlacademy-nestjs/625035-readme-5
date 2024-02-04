import { ApiProperty } from '@nestjs/swagger';
import { PublicationType } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

const ANNOUNCEMENT_LENGTH = {
  MIN: 50,
  MAX: 255,
};
const ANNOUNCEMENT_TEXT_LENGTH = {
  MIN: 100,
  MAX: 1024,
};
const QUOTE_AUTHOR_LENGTH = {
  MIN: 3,
  MAX: 50,
};
const QUOTE_TEXT_LENGTH = {
  MIN: 20,
  MAX: 300,
};

const MAX_LINK_DESCRIPTION_LENGTH = {
  MAX: 300,
};

export class UpdatePublicationDto {
  @ApiProperty({
    description: 'title of the post',
    example: 'new title',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'author id',
    example: 'id',
  })
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'your video from youtube',
    example: 'videourl',
  })
  @IsNotEmpty()
  @IsOptional()
  videoLink?: string;

  @ApiProperty({
    description: 'announcement of the publication',
    example: 'take a look at the publication',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(ANNOUNCEMENT_LENGTH.MIN, ANNOUNCEMENT_LENGTH.MAX)
  announcement?: string;

  @ApiProperty({
    description: 'main text of the publication',
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(ANNOUNCEMENT_TEXT_LENGTH.MIN, ANNOUNCEMENT_TEXT_LENGTH.MAX)
  announcementText?: string;

  @ApiProperty({
    description: 'author of the quote',
    example: 'Jason Statham',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(QUOTE_AUTHOR_LENGTH.MIN, QUOTE_AUTHOR_LENGTH.MAX)
  quoteAuthor?: string;

  @ApiProperty({
    description: 'the quote',
    example: 'Today people worth less than their clothes',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(QUOTE_TEXT_LENGTH.MIN, QUOTE_TEXT_LENGTH.MAX)
  quoteText?: string;

  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @IsNotEmpty()
  @IsOptional()
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i))
  photo?: string;

  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  link?: string;

  @ApiProperty({
    description: 'just a few words about the resource',
    example: 'Your academy',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(MAX_LINK_DESCRIPTION_LENGTH.MAX)
  linkDescription?: string;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'type of publication',
    example: PublicationType.video,
  })
  @IsNotEmpty()
  @IsString()
  type: PublicationType;
}
