import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PublicationRdo {
  @Expose()
  @ApiProperty({
    description: 'Post unique ID',
    example: 'id',
  })
  public id: string;

  @ApiProperty({
    description: 'Author of the publication',
    example: 'Author',
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: 'Date of creation of the publication',
    example: new Date(),
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Date of publication',
    example: new Date(),
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Initial author of the publication',
    example: 'Author',
  })
  @Expose()
  public initialAuthor: string;
}
