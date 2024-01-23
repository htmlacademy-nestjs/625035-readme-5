import { Entity } from '@project/shared/core';
import {
  Comment,
  Like,
  LinkPublication,
  PhotoPublication,
  Publication,
  PublicationState,
  PublicationType,
  QuotePublication,
  Repost,
  Tag,
  TextPublication,
  VideoPublication,
} from '@project/shared/shared-types';

// ? это входные данные или выходные?
// ? как быть, если публикации записываются все в одну таблицу?
// ! такая же типизация в project/shared/core/src/lib/repository/base-postgres.repository.ts
export abstract class PublicationEntity<V = Publication>
  implements Publication, Entity<string, V>
{
  public comments?: Comment[];
  public createdAt?: Date;
  public id?: string;
  public likes?: Like[];
  public reposts?: Repost[];
  public state: PublicationState;
  public tags: Tag[];
  public title?: string;
  public updatedAt?: Date;
  public userId: string;
  public type: PublicationType;

  constructor(publication: Publication) {
    this.comments = publication.comments;
    this.createdAt = publication.createdAt;
    this.id = publication.id;
    this.likes = publication.likes;
    this.reposts = publication.reposts;
    this.state = publication.state;
    this.tags = publication.tags;
    this.title = publication.title;
    this.updatedAt = publication.updatedAt;
    this.userId = publication.userId;
  }

  toPOJO() {
    return {
      comments: this.comments,
      createdAt: this.createdAt,
      id: this.id,
      likes: this.likes,
      reposts: this.reposts,
      state: this.state,
      tags: this.tags,
      title: this.title,
      updatedAt: this.updatedAt,
      userId: this.userId,
      // ? how to avoid type assertion
    } as V;
  }
}

export class VideoPublicationEntity extends PublicationEntity<VideoPublication> {
  public videoLink: string;

  constructor(publication: VideoPublication) {
    super(publication);
    this.populate(publication);
  }

  static fromObject(publication: VideoPublication): VideoPublicationEntity {
    return new VideoPublicationEntity(publication);
  }

  protected populate(data: VideoPublication): void {
    this.videoLink = data.videoLink;
  }

  public toPOJO(): VideoPublication {
    return {
      comments: this.comments,
      createdAt: this.createdAt,
      id: this.id,
      likes: this.likes,
      state: this.state,
      tags: this.tags,
      title: this.title,
      type: PublicationType.video,
      updatedAt: this.updatedAt,
      userId: this.userId,
      videoLink: this.videoLink,
    };
  }
}

export class TextPublicationEntity extends PublicationEntity<TextPublication> {
  public announcement: string;
  public text: string;

  constructor(publication: TextPublication) {
    super(publication);
    this.populate(publication);
  }

  static fromObject(publication: TextPublication): TextPublicationEntity {
    return new TextPublicationEntity(publication);
  }

  protected populate(data: TextPublication): void {
    this.announcement = data.announcement;
    this.text = data.text;
  }

  public toPOJO(): TextPublication {
    return {
      announcement: this.announcement,
      comments: this.comments,
      createdAt: this.createdAt,
      id: this.id,
      likes: this.likes,
      state: this.state,
      tags: this.tags,
      text: this.text,
      type: PublicationType.text,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}

export class QuotePublicationEntity extends PublicationEntity<QuotePublication> {
  public quoteAuthor: string;
  public quoteText: string;

  constructor(publication: QuotePublication) {
    super(publication);
    this.populate(publication);
  }

  static fromObject(publication: QuotePublication): QuotePublicationEntity {
    return new QuotePublicationEntity(publication);
  }

  protected populate(data: QuotePublication): void {
    this.quoteAuthor = data.quoteAuthor;
    this.quoteText = data.quoteText;
  }

  public toPOJO(): QuotePublication {
    return {
      comments: this.comments,
      createdAt: this.createdAt,
      id: this.id,
      likes: this.likes,
      quoteAuthor: this.quoteAuthor,
      quoteText: this.quoteText,
      state: this.state,
      tags: this.tags,
      type: PublicationType.quote,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}

export class PhotoPublicationEntity extends PublicationEntity<PhotoPublication> {
  public photoLink: string;

  constructor(publication: PhotoPublication) {
    super(publication);
    this.populate(publication);
  }

  static fromObject(publication: PhotoPublication): PhotoPublicationEntity {
    return new PhotoPublicationEntity(publication);
  }

  protected populate(data: PhotoPublication): void {
    this.photoLink = data.photoLink;
  }

  public toPOJO(): PhotoPublication {
    return {
      comments: this.comments,
      createdAt: this.createdAt,
      id: this.id,
      likes: this.likes,
      photoLink: this.photoLink,
      state: this.state,
      tags: this.tags,
      type: PublicationType.photo,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}

export class LinkPublicationEntity extends PublicationEntity<LinkPublication> {
  public link: string;
  public linkDescription: string;

  constructor(publication: LinkPublication) {
    super(publication);
    this.populate(publication);
  }

  static fromObject(publication: LinkPublication): LinkPublicationEntity {
    return new LinkPublicationEntity(publication);
  }

  protected populate(data: LinkPublication): void {
    this.link = data.link;
    this.linkDescription = data.linkDescription;
  }

  public toPOJO(): LinkPublication {
    return {
      comments: this.comments,
      createdAt: this.createdAt,
      id: this.id,
      likes: this.likes,
      link: this.link,
      linkDescription: this.linkDescription,
      reposts: this.reposts,
      state: this.state,
      tags: this.tags,
      type: PublicationType.link,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}

export type PublicationEntityAny =
  | VideoPublicationEntity
  | TextPublicationEntity
  | QuotePublicationEntity
  | PhotoPublicationEntity
  | LinkPublicationEntity;
