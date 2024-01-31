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
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i), {
    message: PublicationValidationMessage.photo.photo.invalid.format,
  })
  videoLink?: string;

  @ApiProperty({
    description: 'announcement of the publication',
    example: 'take a look at the publication',
  })
  @IsNotEmpty()
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
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i), {
    message: PublicationValidationMessage.photo.photo.invalid.format,
  })
  photo?: string;

  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @IsNotEmpty()
  @IsUrl({}, { message: PublicationValidationMessage.link.link.invalid.format })
  @IsNotEmpty()
  @IsOptional()
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
  linkDescription?: string;

  @ApiProperty({
    description: 'user id',
    example: 'id',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'tags',
    example: ['tag1, tag2'],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];
}
