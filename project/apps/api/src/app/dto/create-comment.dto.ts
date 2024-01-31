import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment for post from authorized user',
    example: 'comment',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 300, {
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
