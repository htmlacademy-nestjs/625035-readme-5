import { Expose } from 'class-transformer';

export class TagRdo {
  @Expose()
  public publicationId: string;

  @Expose()
  public value: string;

  @Expose()
  public userId: string;
}
