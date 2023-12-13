import { Injectable } from '@nestjs/common';
import {
  LinkRepository,
  PhotoRepository,
  PublicationRepository,
  QuoteRepository,
  TextRepository,
  VideoRepository,
} from './publication.repository';
import { Dto } from './dto/create-publication.dto';
import {
  LinkPublicationEntity,
  PhotoPublicationEntity,
  QuotePublicationEntity,
  TextPublicationEntity,
  VideoPublicationEntity,
} from './publication.entity';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationService: PublicationRepository,
    private readonly videoService: VideoRepository,
    private readonly textService: TextRepository,
    private readonly quoteService: QuoteRepository,
    private readonly photoService: PhotoRepository,
    private readonly linkService: LinkRepository
  ) {}

  // todo: how to deal a  verification of what type is dto?
  public async create(dto: Dto) {
    if ('link' in dto) {
      const newPublication = {
        ...dto,
        // todo: how to detect an author?
        author: '',
        dateOfPublication: new Date(),
        // todo: how to detect an initialAuthor?
        initialAuthor: '',
        isRepost: false,
        dateOfCreation: new Date(),
      };

      const publicationEntity = await new LinkPublicationEntity(newPublication);

      return this.linkService.save(publicationEntity);
    }

    if ('videoLink' in dto) {
      const newPublication = {
        ...dto,
        // todo: how to detect an author?
        author: '',
        dateOfPublication: new Date(),
        // todo: how to detect an initialAuthor?
        initialAuthor: '',
        isRepost: false,
        dateOfCreation: new Date(),
      };

      const publicationEntity = await new VideoPublicationEntity(
        newPublication
      );

      return this.videoService.save(publicationEntity);
    }

    if ('preview' in dto) {
      const newPublication = {
        ...dto,
        // todo: how to detect an author?
        author: '',
        dateOfPublication: new Date(),
        // todo: how to detect an initialAuthor?
        initialAuthor: '',
        isRepost: false,
        dateOfCreation: new Date(),
      };

      const publicationEntity = await new TextPublicationEntity(newPublication);

      return this.textService.save(publicationEntity);
    }

    if ('quote_author' in dto) {
      const newPublication = {
        ...dto,
        // todo: how to detect an author?
        author: '',
        dateOfPublication: new Date(),
        // todo: how to detect an initialAuthor?
        initialAuthor: '',
        isRepost: false,
        dateOfCreation: new Date(),
      };

      const publicationEntity = await new QuotePublicationEntity(
        newPublication
      );

      return this.quoteService.save(publicationEntity);
    }

    if ('photo' in dto) {
      const newPublication = {
        ...dto,
        // todo: how to detect an author?
        author: '',
        dateOfPublication: new Date(),
        // todo: how to detect an initialAuthor?
        initialAuthor: '',
        isRepost: false,
        dateOfCreation: new Date(),
      };

      const publicationEntity = await new PhotoPublicationEntity(
        newPublication
      );

      return this.photoService.save(publicationEntity);
    }
  }
}
