import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AUTH_ERRORS } from '../authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'unique email address',
    example: 'user@user.com',
  })
  @IsEmail(
    {},
    {
      message: AUTH_ERRORS.AUTH_USER_EMAIL_NOT_VALID,
    }
  )
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
