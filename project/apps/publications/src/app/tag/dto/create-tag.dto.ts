import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'value of the tag',
    example: 'this is tag',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description: 'Referred user unique ID',
    example: '1234-5678-9012-3456',
  })
  @IsNotEmpty()
  @IsMongoId()
  public userId: string;
}
