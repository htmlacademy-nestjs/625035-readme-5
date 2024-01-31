import { PublicationType } from '@prisma/client';
import { Comment } from './comment.interface';
import { Like } from './like.interface';
import { Repost } from './repost.interface';
import { Tag } from './tag.interface';

// ! todo: fix all types here
export interface Publication {
  authorId: string;
  comments?: Comment[];
  createdAt?: Date;
  id?: string;
  isPublished?: boolean;
  likes?: Like[];
  originalId?: string;
  reposts?: Repost[];
  tags?: Tag[];
  title?: string;
  type: PublicationType;
  updatedAt?: Date;
  userId?: string;
}

export interface VideoPublication extends Publication {
  videoLink?: string;
}

export interface TextPublication extends Publication {
  announcement?: string;
  announcementText?: string;
}

export interface QuotePublication extends Publication {
  quoteAuthor?: string;
  quoteText?: string;
}

export interface PhotoPublication extends Publication {
  photoLink?: string;
}

export interface LinkPublication extends Publication {
  link?: string;
  linkDescription?: string;
}

export type PublicationAny =
  | VideoPublication
  | TextPublication
  | QuotePublication
  | PhotoPublication
  | LinkPublication;
