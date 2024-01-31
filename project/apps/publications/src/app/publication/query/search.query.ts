import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { PublicationValidationMessage } from '../publication.constant';

export class SearchQuery {
  @ApiProperty({
    description: 'The title word to search',
    example: 'some text',
  })
  @IsString({ message: PublicationValidationMessage.title.invalid.format })
  public title?: string;
}
