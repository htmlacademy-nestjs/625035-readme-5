import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

const COMMENT_MIN_LENGTH = 10;
const COMMENT_MAX_LENGTH = 300;

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment for post from authorized user',
    example: 'comment',
  })
  @IsString()
  @IsNotEmpty()
  @Length(COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH, {
    message: 'Comment must be string from 10 to 300 symbols',
  })
  public value: string;

  @ApiProperty({
    description: 'user id',
    example: 'id',
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
