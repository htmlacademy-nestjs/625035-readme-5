import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class UserIdDto {
  @ApiProperty({
    description: 'Mongo UUID for user id',
    example: 'id',
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
