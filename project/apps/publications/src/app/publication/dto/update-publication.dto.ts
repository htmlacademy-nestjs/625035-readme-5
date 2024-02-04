import { ApiProperty } from '@nestjs/swagger';

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
import {
  PublicationValidationMessage,
  PublicationValidationParams,
} from '../publication.constant';
import { PublicationType } from '@prisma/client';

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
    description: 'your video from youtube',
    example: 'videourl',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsUrl(
    {},
    {
      message: PublicationValidationMessage.video.url.invalid.format,
    }
  )
  videoLink?: string;

  @ApiProperty({
    description: 'announcement of the publication',
    example: 'take a look at the publication',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString({
    message: PublicationValidationMessage.text.announcement.invalid.format,
  })
  @Length(
    PublicationValidationParams.announcement.length.min,
    PublicationValidationParams.announcement.length.max,
    {
      message: PublicationValidationMessage.text.announcement.invalid.length,
    }
  )
  announcement?: string;

  @ApiProperty({
    description: 'main text of the publication',
    example: '',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString({ message: PublicationValidationMessage.text.text.invalid.format })
  @Length(
    PublicationValidationParams.text.length.min,
    PublicationValidationParams.text.length.max,
    {
      message: PublicationValidationMessage.text.text.invalid.length,
    }
  )
  announcementText?: string;

  @ApiProperty({
    description: 'author of the quote',
    example: 'Jason Statham',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString({
    message: PublicationValidationMessage.quote.author.invalid.format,
  })
  @Length(
    PublicationValidationParams.quoteAuthor.length.min,
    PublicationValidationParams.quoteAuthor.length.max,
    {
      message: PublicationValidationMessage.quote.author.invalid.length,
    }
  )
  quoteAuthor?: string;

  @ApiProperty({
    description: 'the quote',
    example: 'Today people worth less than their clothes',
  })
  @IsNotEmpty()
  @IsString({
    message: PublicationValidationMessage.quote.text.invalid.format,
  })
  @IsOptional()
  @Length(
    PublicationValidationParams.quoteText.length.min,
    PublicationValidationParams.quoteText.length.max,
    {
      message: PublicationValidationMessage.quote.text.invalid.length,
    }
  )
  quoteText?: string;

  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @IsNotEmpty()
  @IsOptional()
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i), {
    message: PublicationValidationMessage.photo.photo.invalid.format,
  })
  photo?: string;

  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsUrl({}, { message: PublicationValidationMessage.link.link.invalid.format })
  @IsNotEmpty()
  link?: string;

  @ApiProperty({
    description: 'just a few words about the resource',
    example: 'Your academy',
  })
  @IsNotEmpty()
  @IsString({
    message: PublicationValidationMessage.link.linkDescription.invalid.format,
  })
  @MaxLength(PublicationValidationParams.link.length.max, {
    message: PublicationValidationMessage.link.linkDescription.invalid.length,
  })
  @IsOptional()
  linkDescription?: string;

  @ApiProperty({
    description: 'author id',
    example: 'id',
  })
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'type of publication',
    example: PublicationType.video,
  })
  @IsNotEmpty()
  @IsString()
  type: PublicationType;

  @ApiProperty({
    description: 'tags',
    example: ['tag1, tag2'],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];
}
