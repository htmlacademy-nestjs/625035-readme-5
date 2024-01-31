import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, Matches } from 'class-validator';
import { PublicationValidationMessage } from '../publication.constant';
import { PublicationDto } from './create-base-publication.dto';

export class CreatePhotoPublicationDto extends PublicationDto {
  @ApiProperty({
    description: 'your best photo',
    example: 'your selfie file',
  })
  @IsNotEmpty()
  @Matches(RegExp(/(.png$|.jpg$|.jpeg$)/i), {
    message: PublicationValidationMessage.photo.photo.invalid.format,
  })
  public photo: string;
}
