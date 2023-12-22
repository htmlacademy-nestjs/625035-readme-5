import { ApiProperty } from '@nestjs/swagger';

import { PublicationState } from '@project/shared/shared-types';

export class PublicationDto {
  @ApiProperty({
    description: 'Status of the publication',
    example: 'publication',
  })
  status: PublicationState.Publication;
  @ApiProperty({
    description: 'tags of the publication',
    example: ['test', 'tags'],
  })
  tags?: string[];
}

export class CreateVideoPublicationDto extends PublicationDto {
  public name: string;
  public videoLink: string;
}

export class CreateTextPublicationDto extends PublicationDto {
  public name: string;
  public preview: string;
  public text: string;
}

export class CreateQuotePublicationDto extends PublicationDto {
  public quote_author: string;
  public text: string;
}

export class CreatePhotoPublicationDto extends PublicationDto {
  public photo: Blob;
}

export class CreateLinkPublicationDto extends PublicationDto {
  public link: string;
  public description: string;
}
