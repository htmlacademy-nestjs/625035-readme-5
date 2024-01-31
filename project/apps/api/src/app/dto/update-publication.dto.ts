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
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i))
  videoLink?: string;

  @ApiProperty({
    description: 'announcement of the publication',
    example: 'take a look at the publication',
  })
  @IsNotEmpty()
  @IsString()
  @Length(50, 255)
  announcement?: string;

  @ApiProperty({
    description: 'main text of the publication',
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  @Length(100, 1024)
  announcementText?: string;

  @ApiProperty({
    description: 'author of the quote',
    example: 'Jason Statham',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  quoteAuthor?: string;

  @ApiProperty({
    description: 'the quote',
    example: 'Today people worth less than their clothes',
  })
  @IsNotEmpty()
  @IsString()
  @Length(20, 300)
  quoteText?: string;

  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @IsNotEmpty()
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i))
  photo?: string;

  @ApiProperty({
    description: 'link to some interesting resource',
    example: 'https://htmlacademy.ru/',
  })
  @IsNotEmpty()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  link?: string;

  @ApiProperty({
    description: 'just a few words about the resource',
    example: 'Your academy',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  linkDescription?: string;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];
}
