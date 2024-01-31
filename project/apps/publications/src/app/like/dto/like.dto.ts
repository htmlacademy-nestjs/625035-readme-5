import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';

export class LikeDto {
  @ApiProperty({
    description: 'Referred user unique ID',
    example: 'id',
  })
  @IsNotEmpty()
  @IsMongoId()
  public userId: string;
}
