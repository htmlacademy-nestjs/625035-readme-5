import { Expose } from 'class-transformer';
import { PublicationRdo } from './publication.rdo';

export class BlogPostWithPaginationRdo {
  @Expose()
  public currentPage: number;

  @Expose()
  public entities: PublicationRdo[];

  @Expose()
  public itemsPerPage: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public totalPages: number;
}
