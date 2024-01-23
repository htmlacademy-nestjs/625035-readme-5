import {
  LinkPublication,
  PhotoPublication,
  PublicationAny,
  PublicationType,
  QuotePublication,
  TextPublication,
  VideoPublication,
} from '@project/shared/shared-types';

import {
  LinkPublicationEntity,
  PhotoPublicationEntity,
  PublicationEntityAny,
  QuotePublicationEntity,
  TextPublicationEntity,
  VideoPublicationEntity,
} from './publication.entity';

export const PublicationEntityAdapter = {
  [PublicationType.link]: (publication: LinkPublication) =>
    new LinkPublicationEntity(publication),
  [PublicationType.photo]: (publication: PhotoPublication) =>
    new PhotoPublicationEntity(publication),
  [PublicationType.quote]: (publication: QuotePublication) =>
    new QuotePublicationEntity(publication),
  [PublicationType.text]: (publication: TextPublication) =>
    new TextPublicationEntity(publication),
  [PublicationType.video]: (publication: VideoPublication) =>
    new VideoPublicationEntity(publication),
};

export function PublicationEntityFactory(
  publication: PublicationAny
): PublicationEntityAny {
  console.log('publication', publication);
  // ? how to fix a ts here
  // @ts-ignore
  return PublicationEntityAdapter[publication.type](publication);
}
