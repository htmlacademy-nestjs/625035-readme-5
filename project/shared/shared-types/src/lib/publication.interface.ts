import { Comment } from './comment.interface';
import { Like } from './like.interface';
import { Repost } from './repost.interface';

export enum PublicationState {
  Draft = 'draft',
  Publication = 'publication',
}

export interface Publication {
  comments?: Comment[];
  createdAt?: Date;
  id?: string;
  likes?: Like[];
  reposts?: Repost[];
  state: PublicationState;
  tags?: string[];
  title?: string;
  type?: PublicationType;
  userId: string;
  updatedAt?: Date;
}

export interface VideoPublication extends Publication {
  videoLink: string;
}

export interface TextPublication extends Publication {
  announcement: string;
  text: string;
}

export interface QuotePublication extends Publication {
  quoteAuthor: string;
  quoteText: string;
}

export interface PhotoPublication extends Publication {
  photoLink: string;
}

export interface LinkPublication extends Publication {
  link: string;
  linkDescription: string;
}

export enum PublicationType {
  link = 'link',
  photo = 'photo',
  quote = 'quote',
  text = 'text',
  video = 'video',
}

export type PublicationAny =
  | VideoPublication
  | TextPublication
  | QuotePublication
  | PhotoPublication
  | LinkPublication;
