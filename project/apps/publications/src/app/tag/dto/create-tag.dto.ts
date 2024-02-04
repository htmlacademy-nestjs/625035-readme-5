import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';
import { TAG_VALIDATION } from '../tag.constant';
import { Transform } from 'class-transformer';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tags',
    example: ['test', 'test2'],
  })
  @IsArray()
  @ArrayMaxSize(TAG_VALIDATION.LIMIT, {
    message: `Max tags count must be ${TAG_VALIDATION.LIMIT}`,
  })
  @Length(TAG_VALIDATION.MIN_TAG_LENGTH, TAG_VALIDATION.MAX_TAG_LENGTH, {
    each: true,
    message: `Length of tag must be from ${TAG_VALIDATION.MIN_TAG_LENGTH} to ${TAG_VALIDATION.MAX_TAG_LENGTH} symbols`,
  })
  @IsString({
    each: true,
  })
  @Transform(({ value }) =>
    value.map((item) => item.replace(/\ /g, '_').toLowerCase())
  )
  public values: string[];
}
