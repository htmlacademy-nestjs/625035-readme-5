import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

import {
  PublicationValidationMessage,
  PublicationValidationParams,
} from '../publication.constant';
import { PublicationType } from '@prisma/client';

// todo: add validation. transformation
export class PublicationDto {
  @ApiProperty({
    description: 'Status of the publication',
    example: true,
  })
  isPublished: true;

  //? should be in DTO?
  @ApiProperty({
    description: 'user id',
    example: 'some id',
  })
  userId: string;

  @ApiProperty({
    description: 'tags of the publication',
    example: ['tag1', 'tag2'],
  })
  tags?: string[];
}

export class CreateVideoPublicationDto extends PublicationDto {
  @ApiProperty({
    description: 'title of the publication',
    example: 'publication name',
  })
  @IsNotEmpty()
  @IsString({
    message: PublicationValidationMessage.title.invalid.format,
  })
  @Length(
    PublicationValidationParams.title.length.min,
    PublicationValidationParams.title.length.max,
    {
      message: PublicationValidationMessage.title.invalid.length,
    }
  )
  public title: string;

  @ApiProperty({
    description: 'link to the video',
    example: 'https://youtu.be/XqZsoesa55w?si=SzsSu7S0PVx2iMyX',
  })
  @IsNotEmpty()
  @IsUrl({}, { message: PublicationValidationMessage.video.url.invalid.format })
  public videoLink: string;
}

export class CreateTextPublicationDto extends PublicationDto {
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
  public announcement: string;

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
  public announcementText: string;

  @ApiProperty({
    description: 'title of the publication',
    example: 'publication title',
  })
  @IsNotEmpty()
  @IsString({ message: PublicationValidationMessage.title.invalid.format })
  @Length(
    PublicationValidationParams.title.length.min,
    PublicationValidationParams.title.length.max,
    {
      message: PublicationValidationMessage.title.invalid.length,
    }
  )
  public title: string;
}

export class CreateQuotePublicationDto extends PublicationDto {
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
  public quoteAuthor: string;

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
  public quoteText: string;
}

// ! todo: add validation here. Should be file or string?
export class CreatePhotoPublicationDto extends PublicationDto {
  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @IsNotEmpty()
  public photo: string;
}

export class CreateLinkPublicationDto extends PublicationDto {
  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @IsNotEmpty()
  @IsUrl({}, { message: PublicationValidationMessage.link.link.invalid.format })
  public link: string;

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
  public linkDescription: string;
}

export type CreatePublicationDtoType =
  | CreateLinkPublicationDto
  | CreatePhotoPublicationDto
  | CreateQuotePublicationDto
  | CreateTextPublicationDto
  | CreateVideoPublicationDto;

export const CreatePublicationDto = {
  [PublicationType.link]: CreateLinkPublicationDto,
  [PublicationType.photo]: CreatePhotoPublicationDto,
  [PublicationType.quote]: CreateQuotePublicationDto,
  [PublicationType.text]: CreateTextPublicationDto,
  [PublicationType.video]: CreateVideoPublicationDto,
};
