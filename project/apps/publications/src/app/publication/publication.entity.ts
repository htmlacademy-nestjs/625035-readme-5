import { PublicationType } from '@prisma/client';
import { Entity } from '@project/shared/core';
import {
  LinkPublication,
  PhotoPublication,
  Publication,
  QuotePublication,
  Repost,
  TextPublication,
  VideoPublication,
} from '@project/shared/shared-types';
import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';
import { TagEntity } from '../tag/tag.entity';
import { CreateVideoPublicationDto } from './dto/create-video-publication.dto';
import { CreateTextPublicationDto } from './dto/create-text-publication.dto';
import { CreateQuotePublicationDto } from './dto/create-quote-publication.dto';
import { CreatePhotoPublicationDto } from './dto/create-photo-publication.dto';
import { CreateLinkPublicationDto } from './dto/create-link-publication.dto';

export class VideoPublicationEntity
  implements Publication, Entity<string, VideoPublication>
{
  public authorId: string;
  public comments?: CommentEntity[];
  public createdAt?: Date;
  public id?: string;
  public isPublished?: boolean;
  public likes?: LikeEntity[];
  // ! todo: should be repostEntity
  public reposts?: Repost[];
  public tags: TagEntity[];
  public title?: string;
  public type: PublicationType;
  public updatedAt?: Date;
  public videoLink: string;

  static fromObject(publication: VideoPublication): VideoPublicationEntity {
    return new VideoPublicationEntity().populate(publication);
  }

  static fromDto(
    dto: CreateVideoPublicationDto,
    tags: TagEntity[]
  ): VideoPublicationEntity {
    const entity = new VideoPublicationEntity();

    entity.authorId = dto.authorId;
    entity.comments = [];
    entity.likes = [];
    entity.reposts = [];
    entity.tags = tags;
    entity.title = dto.title;
    entity.type = PublicationType.video;
    entity.videoLink = dto.videoLink;

    return entity;
  }

  protected populate(data: VideoPublication): VideoPublicationEntity {
    this.authorId = data.authorId;
    this.comments = data.comments.map((comment) =>
      CommentEntity.fromObject(comment)
    );
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.likes = data.likes.map((like) => LikeEntity.fromObject(like));
    this.reposts = [];
    this.isPublished = data.isPublished;
    this.tags = data.tags.map((tag) => TagEntity.fromObject(tag));
    this.title = data.title;
    this.updatedAt = data.updatedAt;
    this.videoLink = data.videoLink;

    return this;
  }

  public toPOJO(): VideoPublication {
    return {
      authorId: this.authorId,
      comments: this.comments.map((comment) => comment.toPOJO()),
      createdAt: this.createdAt,
      id: this.id,
      likes: this.likes.map((like) => like.toPOJO()),
      isPublished: this.isPublished,
      tags: this.tags.map((tag) => tag.toPOJO()),
      title: this.title,
      type: PublicationType.video,
      updatedAt: this.updatedAt,
      videoLink: this.videoLink,
    };
  }
}

export class TextPublicationEntity
  implements Publication, Entity<string, TextPublication>
{
  public authorId: string;
  public announcement: string;
  public announcementText: string;
  public comments?: CommentEntity[];
  public createdAt?: Date;
  public id?: string;
  public isPublished?: boolean;
  public likes?: LikeEntity[];
  // ! todo: should be repostEntity
  public reposts?: Repost[];
  public tags: TagEntity[];
  public title?: string;
  public type: PublicationType;
  public updatedAt?: Date;

  static fromObject(publication: TextPublication): TextPublicationEntity {
    return new TextPublicationEntity().populate(publication);
  }

  static fromDto(
    dto: CreateTextPublicationDto,
    tags: TagEntity[]
  ): TextPublicationEntity {
    const entity = new TextPublicationEntity();

    entity.authorId = dto.authorId;
    entity.comments = [];
    entity.likes = [];
    entity.reposts = [];
    entity.tags = tags;
    entity.type = PublicationType.text;
    entity.title = dto.title;
    entity.announcement = dto.announcement;
    entity.announcementText = dto.announcementText;

    return entity;
  }

  protected populate(data: TextPublication): TextPublicationEntity {
    this.authorId = data.authorId;
    this.comments = data.comments.map((comment) =>
      CommentEntity.fromObject(comment)
    );
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.likes = data.likes.map((like) => LikeEntity.fromObject(like));
    this.reposts = [];
    this.isPublished = data.isPublished;
    this.tags = data.tags.map((tag) => TagEntity.fromObject(tag));
    this.title = data.title;
    this.updatedAt = data.updatedAt;
    this.announcement = data.announcement;
    this.announcementText = data.announcementText;

    return this;
  }

  public toPOJO(): TextPublication {
    return {
      announcement: this.announcement,
      announcementText: this.announcementText,
      authorId: this.authorId,
      comments: this.comments.map((comment) => comment.toPOJO()),
      createdAt: this.createdAt,
      id: this.id,
      isPublished: this.isPublished,
      likes: this.likes.map((like) => like.toPOJO()),
      tags: this.tags.map((tag) => tag.toPOJO()),
      title: this.title,
      type: PublicationType.text,
      updatedAt: this.updatedAt,
    };
  }
}

export class QuotePublicationEntity
  implements Publication, Entity<string, QuotePublication>
{
  public comments?: CommentEntity[];
  public createdAt?: Date;
  public id?: string;
  public isPublished?: boolean;
  public likes?: LikeEntity[];
  // ! todo: should be repostEntity
  public reposts?: Repost[];
  public tags: TagEntity[];
  public title?: string;
  public type: PublicationType;
  public updatedAt?: Date;
  public authorId: string;

  public quoteAuthor: string;
  public quoteText: string;

  static fromObject(publication: QuotePublication): QuotePublicationEntity {
    return new QuotePublicationEntity().populate(publication);
  }

  static fromDto(
    dto: CreateQuotePublicationDto,
    tags: TagEntity[]
  ): QuotePublicationEntity {
    const entity = new QuotePublicationEntity();

    entity.authorId = dto.authorId;
    entity.comments = [];
    entity.likes = [];
    entity.quoteAuthor = dto.quoteAuthor;
    entity.quoteText = dto.quoteText;
    entity.reposts = [];
    entity.tags = tags;
    entity.type = PublicationType.quote;

    return entity;
  }

  protected populate(data: QuotePublication): QuotePublicationEntity {
    this.authorId = data.authorId;
    this.comments = data.comments.map((comment) =>
      CommentEntity.fromObject(comment)
    );
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.likes = data.likes.map((like) => LikeEntity.fromObject(like));
    this.reposts = [];
    this.isPublished = data.isPublished;
    this.tags = data.tags.map((tag) => TagEntity.fromObject(tag));
    this.title = data.title;
    this.updatedAt = data.updatedAt;

    this.quoteAuthor = data.quoteAuthor;
    this.quoteText = data.quoteText;

    return this;
  }

  public toPOJO(): QuotePublication {
    return {
      authorId: this.authorId,
      comments: this.comments.map((comment) => comment.toPOJO()),
      createdAt: this.createdAt,
      id: this.id,
      isPublished: this.isPublished,
      likes: this.likes.map((like) => like.toPOJO()),
      quoteAuthor: this.quoteAuthor,
      quoteText: this.quoteText,
      tags: this.tags.map((tag) => tag.toPOJO()),
      type: PublicationType.quote,
      updatedAt: this.updatedAt,
    };
  }
}

export class PhotoPublicationEntity
  implements Publication, Entity<string, PhotoPublication>
{
  public comments?: CommentEntity[];
  public createdAt?: Date;
  public id?: string;
  public isPublished?: boolean;
  public likes?: LikeEntity[];
  // ! todo: should be repostEntity
  public reposts?: Repost[];
  public tags: TagEntity[];
  public type: PublicationType;
  public updatedAt?: Date;
  public authorId: string;

  public photoLink: string;

  static fromObject(publication: PhotoPublication): PhotoPublicationEntity {
    return new PhotoPublicationEntity().populate(publication);
  }

  static fromDto(
    dto: CreatePhotoPublicationDto,
    tags: TagEntity[]
  ): PhotoPublicationEntity {
    const entity = new PhotoPublicationEntity();

    entity.authorId = dto.authorId;
    entity.comments = [];
    entity.likes = [];
    entity.photoLink = dto.photo;
    entity.reposts = [];
    entity.tags = tags;
    entity.type = PublicationType.photo;

    return entity;
  }

  protected populate(data: PhotoPublication): PhotoPublicationEntity {
    this.authorId = data.authorId;
    this.comments = data.comments.map((comment) =>
      CommentEntity.fromObject(comment)
    );
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.likes = data.likes.map((like) => LikeEntity.fromObject(like));
    this.reposts = [];
    this.isPublished = data.isPublished;
    this.tags = data.tags.map((tag) => TagEntity.fromObject(tag));
    this.updatedAt = data.updatedAt;
    this.photoLink = data.photoLink;

    return this;
  }

  public toPOJO(): PhotoPublication {
    return {
      authorId: this.authorId,
      comments: this.comments.map((comment) => comment.toPOJO()),
      createdAt: this.createdAt,
      id: this.id,
      isPublished: this.isPublished,
      likes: this.likes.map((like) => like.toPOJO()),
      photoLink: this.photoLink,
      tags: this.tags.map((tag) => tag.toPOJO()),
      type: PublicationType.photo,
      updatedAt: this.updatedAt,
    };
  }
}

export class LinkPublicationEntity
  implements Publication, Entity<string, LinkPublication>
{
  public comments?: CommentEntity[];
  public createdAt?: Date;
  public id?: string;
  public isPublished?: boolean;
  public likes?: LikeEntity[];
  // ! todo: should be repostEntity
  public reposts?: Repost[];
  public tags: TagEntity[];
  public type: PublicationType;
  public updatedAt?: Date;
  public authorId: string;

  public link: string;
  public linkDescription: string;

  static fromObject(publication: LinkPublication): LinkPublicationEntity {
    return new LinkPublicationEntity().populate(publication);
  }

  static fromDto(
    dto: CreateLinkPublicationDto,
    tags: TagEntity[]
  ): LinkPublicationEntity {
    const entity = new LinkPublicationEntity();

    entity.authorId = dto.authorId;
    entity.comments = [];
    entity.likes = [];
    entity.link = dto.link;
    entity.linkDescription = dto.linkDescription;
    entity.reposts = [];
    entity.tags = tags;
    entity.type = PublicationType.link;

    return entity;
  }

  protected populate(data: LinkPublication): LinkPublicationEntity {
    this.authorId = data.authorId;
    this.comments = data.comments.map((comment) =>
      CommentEntity.fromObject(comment)
    );
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.likes = data.likes.map((like) => LikeEntity.fromObject(like));
    this.reposts = [];
    this.isPublished = data.isPublished;
    this.tags = data.tags.map((tag) => TagEntity.fromObject(tag));
    this.updatedAt = data.updatedAt;
    this.link = data.link;
    this.linkDescription = data.linkDescription;

    return this;
  }

  public toPOJO(): LinkPublication {
    return {
      authorId: this.authorId,
      comments: this.comments.map((comment) => comment.toPOJO()),
      createdAt: this.createdAt,
      id: this.id,
      isPublished: this.isPublished,
      likes: this.likes.map((like) => like.toPOJO()),
      link: this.link,
      linkDescription: this.linkDescription,
      reposts: this.reposts,
      tags: this.tags.map((tag) => tag.toPOJO()),
      type: PublicationType.link,
      updatedAt: this.updatedAt,
    };
  }
}

export type PublicationEntityAny =
  | VideoPublicationEntity
  | TextPublicationEntity
  | QuotePublicationEntity
  | PhotoPublicationEntity
  | LinkPublicationEntity;
