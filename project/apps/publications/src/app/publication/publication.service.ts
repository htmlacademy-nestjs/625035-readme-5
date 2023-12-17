import { Injectable } from '@nestjs/common';
import {
  LinkRepository,
  PhotoRepository,
  PublicationRepository,
  QuoteRepository,
  TextRepository,
  VideoRepository,
} from './publication.repository';
import { PublicationDto } from './dto/create-publication.dto';
import {
  LinkPublicationEntity,
  PhotoPublicationEntity,
  PublicationEntity,
  QuotePublicationEntity,
  TextPublicationEntity,
  VideoPublicationEntity,
} from './publication.entity';
import { UpdatePublicationDto } from './dto/edit-publication.dto';

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
  public async create(dto: PublicationDto) {
    // if ('link' in dto) {
    //   const newPublication = {
    //     ...dto,
    //     // todo: how to detect an author?
    //     author: '',
    //     dateOfPublication: new Date(),
    //     // todo: how to detect an initialAuthor?
    //     initialAuthor: '',
    //     isRepost: false,
    //     dateOfCreation: new Date(),
    //   };
    //   const publicationEntity = await new LinkPublicationEntity(newPublication);
    //   return this.linkService.save(publicationEntity);
    // }
    // if ('videoLink' in dto) {
    //   const newPublication = {
    //     ...dto,
    //     // todo: how to detect an author?
    //     author: '',
    //     dateOfPublication: new Date(),
    //     // todo: how to detect an initialAuthor?
    //     initialAuthor: '',
    //     isRepost: false,
    //     dateOfCreation: new Date(),
    //   };
    //   const publicationEntity = await new VideoPublicationEntity(
    //     newPublication
    //   );
    //   return this.videoService.save(publicationEntity);
    // }
    // if ('preview' in dto) {
    //   const newPublication = {
    //     ...dto,
    //     // todo: how to detect an author?
    //     author: '',
    //     dateOfPublication: new Date(),
    //     // todo: how to detect an initialAuthor?
    //     initialAuthor: '',
    //     isRepost: false,
    //     dateOfCreation: new Date(),
    //   };
    //   const publicationEntity = await new TextPublicationEntity(newPublication);
    //   return this.textService.save(publicationEntity);
    // }
    // if ('quote_author' in dto) {
    //   const newPublication = {
    //     ...dto,
    //     // todo: how to detect an author?
    //     author: '',
    //     dateOfPublication: new Date(),
    //     // todo: how to detect an initialAuthor?
    //     initialAuthor: '',
    //     isRepost: false,
    //     dateOfCreation: new Date(),
    //   };
    //   const publicationEntity = await new QuotePublicationEntity(
    //     newPublication
    //   );
    //   return this.quoteService.save(publicationEntity);
    // }
    // if ('photo' in dto) {
    //   const newPublication = {
    //     ...dto,
    //     // todo: how to detect an author?
    //     author: '',
    //     dateOfPublication: new Date(),
    //     // todo: how to detect an initialAuthor?
    //     initialAuthor: '',
    //     isRepost: false,
    //     dateOfCreation: new Date(),
    //   };
    //   const publicationEntity = await new PhotoPublicationEntity(
    //     newPublication
    //   );
    //   return this.photoService.save(publicationEntity);
    // }

    const newPublication = {
      ...dto,
      // todo: how to detect an author?
      author: '',
      dateOfPublication: new Date(),
      dateOfCreation: new Date(),
      // todo: how to detect an initialAuthor?
      initialAuthor: '',
      isRepost: false,
    };

    const publicationEntity = await new PublicationEntity(newPublication);
    return this.publicationService.save(publicationEntity);
  }

  public async getPublication(id: string) {
    return await this.publicationService.findById(id);
  }

  public async getPublications() {
    return this.publicationService.getAll();
  }

  public async deletePublication(id: string) {
    return this.publicationService.deleteById(id);
  }

  public async updatePublication(
    id: string,
    publication: UpdatePublicationDto
  ) {
    const existedPublication = (
      await this.publicationService.findById(id)
    ).toPOJO();
    const publicationEntity = await new PublicationEntity({
      ...existedPublication,
      ...publication,
    });

    return await this.publicationService.update(id, publicationEntity);
  }
}
