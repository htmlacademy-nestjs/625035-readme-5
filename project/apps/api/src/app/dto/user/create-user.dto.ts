import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsEmail({}, { message: 'invalid email' })
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
