import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@mail.com',
  })
  @IsEmail({})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '1111',
  })
  @IsString()
  public password: string;
}
