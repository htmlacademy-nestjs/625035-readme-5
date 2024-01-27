import { PublicationAny } from '@project/shared/shared-types';

import {
  LinkPublicationEntity,
  PhotoPublicationEntity,
  PublicationEntityAny,
  QuotePublicationEntity,
  TextPublicationEntity,
  VideoPublicationEntity,
} from './publication.entity';
import { PublicationType } from '@prisma/client';

export const publicationEntityAdapter = {
  [PublicationType.link]: LinkPublicationEntity,
  [PublicationType.photo]: PhotoPublicationEntity,
  [PublicationType.quote]: QuotePublicationEntity,
  [PublicationType.text]: TextPublicationEntity,
  [PublicationType.video]: VideoPublicationEntity,
};

export function PublicationEntityFactory(
  publication: PublicationAny
): PublicationEntityAny {
  return publicationEntityAdapter[publication.type].fromObject(publication);
}
