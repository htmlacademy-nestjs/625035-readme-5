export enum PublicationState {
  Draft = 'draft',
  Publication = 'publication',
}

export interface Publication {
  author: string;
  dateOfCreation: number;
  dateOfPublication: number;
  id?: string;
  initialAuthor: string;
  isRepost: boolean;
  status: PublicationState;
  tags?: string[];
}

export interface VideoPublication extends Publication {
  name: string;
  videoLink: string;
}

export interface TextPublication extends Publication {
  name: string;
  preview: string;
  text: string;
}

export interface QuotePublication extends Publication {
  quote_author: string;
  text: string;
}

export interface PhotoPublication extends Publication {
  photo: string;
}

export interface LinkPublication extends Publication {
  link: string;
  description: string;
}
