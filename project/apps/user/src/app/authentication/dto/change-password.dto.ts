import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'current password',
    example: '1111',
  })
  @IsString()
  public currentPassword: string;

  @ApiProperty({
    description: 'new password',
    example: '2222',
  })
  @IsString()
  public newPassword: string;
}
