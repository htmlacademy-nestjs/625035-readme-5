import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Keks',
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User last time updated',
    example: '23/06/1993',
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'User was created',
    example: '22/06/1993',
  })
  @Expose()
  public createdAt: string;
}
