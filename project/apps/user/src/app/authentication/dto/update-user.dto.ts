import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User id',
    example: 'id',
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'User first name',
    example: 'first',
  })
  @IsOptional()
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'last',
  })
  @IsOptional()
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/file/image.jpg',
  })
  @IsString()
  @IsOptional()
  public avatar: string;
}
