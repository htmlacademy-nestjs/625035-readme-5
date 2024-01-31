import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchPublicationDto {
  @ApiProperty({
    description: 'Search publication by title',
    example: 'Title',
  })
  @IsString()
  @IsNotEmpty()
  public title: string;
}
