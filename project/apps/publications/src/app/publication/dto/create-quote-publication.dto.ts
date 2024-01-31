import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length } from 'class-validator';
import {
  PublicationValidationMessage,
  PublicationValidationParams,
} from '../publication.constant';
import { PublicationDto } from './create-base-publication.dto';

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
