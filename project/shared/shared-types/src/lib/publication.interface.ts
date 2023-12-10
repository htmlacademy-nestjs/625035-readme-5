enum PublicationState {
  Draft = 'draft',
  Publication = 'publication',
}

interface Publication {
  author: string;
  dateOfCreation: Date;
  dateOfPublication: Date;
  id?: string;
  initialAuthor: string;
  isRepost: boolean;
  status: PublicationState;
  tags?: string[];
}

export interface VideoPublication extends Publication {
  name: string;
  video_link: string;
}

export interface TextPublication extends Publication {
  name: string;
  preview: string;
  text: string;
}

export interface QuotePublication extends Publication {
  author: string;
  text: string;
}

export interface PhotoPublication extends Publication {
  photo: Blob;
}

export interface LinkPublication extends Publication {
  link: string;
  description: string;
}
