import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';
import {
  PublicationValidationMessage,
  PublicationValidationParams,
} from '../publication.constant';
import { ApiProperty } from '@nestjs/swagger';
import { PublicationDto } from './create-base-publication.dto';

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
