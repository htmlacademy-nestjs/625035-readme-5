import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'New user name',
    example: 'Ivan',
  })
  @IsOptional()
  @IsString()
  public fisrtname: string;

  @ApiProperty({
    description: 'New user name',
    example: 'Palto',
  })
  @IsOptional()
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/image.png',
  })
  @IsString()
  @IsOptional()
  public avatar: string;
}
