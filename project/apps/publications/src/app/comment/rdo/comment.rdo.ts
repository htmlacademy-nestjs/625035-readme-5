import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Publication id',
    example: 'id',
  })
  @Expose()
  public publicationId: string;

  @ApiProperty({
    description: 'Text of comment',
    example: 'comment',
  })
  @Expose()
  public value: string;

  @ApiProperty({
    description: 'User id',
    example: 'id',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date of creation',
    example: new Date(),
  })
  @Expose()
  public createdAt: string;
}
