import { PublicationType } from '@prisma/client';

import { CreateLinkPublicationDto } from './create-link-publication.dto';
import { CreatePhotoPublicationDto } from './create-photo-publication.dto';
import { CreateQuotePublicationDto } from './create-quote-publication.dto';
import { CreateTextPublicationDto } from './create-text-publication.dto';
import { CreateVideoPublicationDto } from './create-video-publication.dto';

export type CreatePublicationDtoType =
  | CreateLinkPublicationDto
  | CreatePhotoPublicationDto
  | CreateQuotePublicationDto
  | CreateTextPublicationDto
  | CreateVideoPublicationDto;

export const CreatePublicationDto = {
  [PublicationType.link]: CreateLinkPublicationDto,
  [PublicationType.photo]: CreatePhotoPublicationDto,
  [PublicationType.quote]: CreateQuotePublicationDto,
  [PublicationType.text]: CreateTextPublicationDto,
  [PublicationType.video]: CreateVideoPublicationDto,
};
