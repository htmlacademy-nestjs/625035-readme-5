import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length } from 'class-validator';
import {
  PublicationValidationMessage,
  PublicationValidationParams,
} from '../publication.constant';
import { PublicationDto } from './create-base-publication.dto';

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
