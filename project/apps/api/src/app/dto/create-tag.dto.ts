import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';

const MAX_SIZE = 8;
const MAX_TAG_LENGTH = 10;
const MIN_TAG_LENGTH = 3;

export class CreateTagDto {
  @ApiProperty({
    description: 'Tags',
    example: ['test', 'test2'],
  })
  @IsArray()
  @ArrayMaxSize(MAX_SIZE, {
    message: `Max tags count must be ${MAX_SIZE}`,
  })
  @Length(MIN_TAG_LENGTH, MAX_TAG_LENGTH, {
    each: true,
    message: `Length of tag must be from ${MIN_TAG_LENGTH} to ${MAX_TAG_LENGTH} symbols`,
  })
  @IsString({
    each: true,
  })
  @Transform(({ value }) =>
    value.map((item) => item.replace(/\ /g, '_').toLowerCase())
  )
  public values: string[];
}
