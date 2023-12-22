import { Entity } from '@project/shared/core';
import {
  Publication,
  PublicationState,
  LinkPublication,
  QuotePublication,
  TextPublication,
  VideoPublication,
  PhotoPublication,
} from '@project/shared/shared-types';

export class PublicationEntity implements Publication, Entity<string> {
  public author: string;
  public dateOfCreation: number;
  public dateOfPublication: number;
  public id?: string;
  public initialAuthor: string;
  public isRepost: boolean;
  public status: PublicationState;
  public tags: string[];

  //todo: how avoid inline style here?
  constructor(publication: Publication) {
    this.author = publication.author;
    this.dateOfCreation = publication.dateOfCreation;
    this.dateOfPublication = publication.dateOfPublication;
    this.initialAuthor = publication.initialAuthor;
    this.isRepost = publication.isRepost;
    this.status = publication.status;
    this.tags = [];

    if (publication.id) {
      this.id = publication.id;
    }
  }

  public toPOJO() {
    return {
      author: this.author,
      dateOfCreation: this.dateOfCreation,
      dateOfPublication: this.dateOfPublication,
      id: this.id,
      initialAuthor: this.initialAuthor,
      isRepost: this.isRepost,
      status: this.status,
      tags: this.tags,
    };
  }
}

export class VideoPublicationEntity extends PublicationEntity {
  public name: string;
  public videoLink: string;

  constructor(publication: VideoPublication) {
    super(publication);
    this.populate(publication);
  }

  protected populate(data: VideoPublication): void {
    this.name = data.name;
    this.videoLink = data.videoLink;
  }
}

export class TextPublicationEntity extends PublicationEntity {
  public name: string;
  public preview: string;
  public text: string;

  constructor(publication: TextPublication) {
    super(publication);
    this.populate(publication);
  }

  protected populate(data: TextPublication): void {
    this.name = data.name;
    this.preview = data.preview;
    this.text = data.text;
  }

  public toPOJO() {
    return {
      author: this.author,
      dateOfCreation: this.dateOfCreation,
      dateOfPublication: this.dateOfPublication,
      id: this.id,
      initialAuthor: this.initialAuthor,
      isRepost: this.isRepost,
      name: this.name,
      preview: this.preview,
      status: this.status,
      tags: this.tags,
      text: this.text,
    };
  }
}

export class QuotePublicationEntity extends PublicationEntity {
  public quote_author: string;
  public text: string;

  constructor(publication: QuotePublication) {
    super(publication);
    this.populate(publication);
  }

  protected populate(data: QuotePublication): void {
    this.quote_author = data.quote_author;
    this.text = data.text;
  }

  public toPOJO() {
    return {
      author: this.author,
      dateOfCreation: this.dateOfCreation,
      dateOfPublication: this.dateOfPublication,
      id: this.id,
      initialAuthor: this.initialAuthor,
      isRepost: this.isRepost,
      quote_author: this.quote_author,
      status: this.status,
      tags: this.tags,
      text: this.text,
    };
  }
}

export class PhotoPublicationEntity extends PublicationEntity {
  public photo: Blob;

  constructor(publication: PhotoPublication) {
    super(publication);
    this.populate(publication);
  }

  protected populate(data: PhotoPublication): void {
    this.photo = data.photo;
  }

  public toPOJO() {
    return {
      author: this.author,
      dateOfCreation: this.dateOfCreation,
      dateOfPublication: this.dateOfPublication,
      id: this.id,
      initialAuthor: this.initialAuthor,
      isRepost: this.isRepost,
      photo: this.photo,
      status: this.status,
      tags: this.tags,
    };
  }
}

export class LinkPublicationEntity extends PublicationEntity {
  public link: string;
  public description: string;

  constructor(publication: LinkPublication) {
    super(publication);
    this.populate(publication);
  }

  protected populate(data: LinkPublication): void {
    this.link = data.link;
    this.description = data.description;
  }

  public toPOJO() {
    return {
      author: this.author,
      dateOfCreation: this.dateOfCreation,
      dateOfPublication: this.dateOfPublication,
      description: this.description,
      id: this.id,
      initialAuthor: this.initialAuthor,
      isRepost: this.isRepost,
      link: this.link,
      status: this.status,
      tags: this.tags,
    };
  }
}
