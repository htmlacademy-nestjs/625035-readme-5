import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import {
  PublicationValidationMessage,
  PublicationValidationParams,
} from '../publication.constant';
import { PublicationDto } from './create-base-publication.dto';

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
