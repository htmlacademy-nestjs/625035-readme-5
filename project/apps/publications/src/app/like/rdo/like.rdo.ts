import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Id of the like',
    example: 'id',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Id of the publication',
    example: 'id',
  })
  @Expose()
  public publicationId: string;

  @ApiProperty({
    description: 'Id of the user',
    example: 'id',
  })
  @Expose()
  public userId: string;
}
