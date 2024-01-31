import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'tag',
  })
  public value: string;

  @ApiProperty({
    description: 'Tag id',
    example: 'id',
  })
  public id: string;
}
