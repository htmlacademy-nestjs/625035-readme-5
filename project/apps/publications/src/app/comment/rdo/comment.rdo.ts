import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public publicationId: string;

  @Expose()
  public value: string;

  @Expose()
  public userId: string;
}
