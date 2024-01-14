import { Comment } from './comment.interface';
import { Like } from './like.interface';
import { Repost } from './repost.interface';
import { Tag } from './tag.interface';

export enum PublicationState {
  Draft = 'draft',
  Publication = 'publication',
}

export interface Publication {
  comments: Comment[];
  createdAt: Date;
  id?: string;
  likes: Like[];
  reposts: Repost[];
  state: PublicationState;
  tags: Tag[];
  title: string;
  updatedAt: Date;
}

export interface VideoPublication extends Publication {
  videoLink: string;
}

export interface TextPublication extends Publication {
  announcement?: string;
  announcementText?: string;
}

export interface QuotePublication extends Publication {
  quoteAuthor: string;
  quoteText: string;
}

export interface PhotoPublication extends Publication {
  photoLink: string;
}

export interface LinkPublication extends Publication {
  url: string;
  urlDescription: string;
}
