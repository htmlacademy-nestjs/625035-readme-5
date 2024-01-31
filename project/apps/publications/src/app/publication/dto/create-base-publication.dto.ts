import { ApiProperty } from '@nestjs/swagger';
import { PublicationType } from '@prisma/client';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PublicationDto {
  @ApiProperty({
    description: 'author id',
    example: 'id',
  })
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty({
    description: 'type of publication',
    example: 'video',
  })
  @IsNotEmpty()
  type: PublicationType;

  @ApiProperty({
    description: 'tags for the publication',
    example: ['tagId, tagId2'],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  public tags?: string[];
}
