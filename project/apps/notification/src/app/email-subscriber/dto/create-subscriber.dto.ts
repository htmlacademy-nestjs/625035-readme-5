import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
  LAST_NAME_IS_EMPTY,
} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'email address',
    example: 'd@g.com',
  })
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'first name of the user',
    example: 'name',
  })
  @IsString()
  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public firstname: string;

  @ApiProperty({
    description: 'last name of the user',
    example: 'lastname',
  })
  @IsString()
  @IsNotEmpty({ message: LAST_NAME_IS_EMPTY })
  public lastname: string;
}
