import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';

export class AddLikeDto {
  @ApiProperty({
    description: 'Referred post unique ID',
    example: '1234-5678-9012-3456',
  })
  @IsNotEmpty()
  @IsUUID('all')
  public publicationId: string;

  @ApiProperty({
    description: 'Referred user unique ID',
    example: '1234-5678-9012-3456',
  })
  @IsNotEmpty()
  @IsMongoId()
  public userId: string;
}
