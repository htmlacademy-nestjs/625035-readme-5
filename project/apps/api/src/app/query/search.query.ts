import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchQuery {
  @ApiProperty({
    description: 'The title word to search.',
    example: 'title',
    default: '',
  })
  @IsString({ message: 'wrong title format' })
  public title?: string;
}
