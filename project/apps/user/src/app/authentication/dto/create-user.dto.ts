import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AUTH_ERRORS } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'your best avatart',
    example: 'avatar.png',
  })
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: AUTH_ERRORS.AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'your name',
    example: 'Palto',
  })
  @IsNotEmpty()
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'Your lastname',
    example: 'Ivanov',
  })
  @IsNotEmpty()
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'Your password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
