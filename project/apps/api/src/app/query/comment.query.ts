import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

const MAX_COMMENTS_COUNT = 50;
const MIN_PAGE = 1;

export class CommentFilterQuery {
  @Transform(({ value }) => +value || MAX_COMMENTS_COUNT)
  @IsNumber()
  @IsOptional()
  public limit = MAX_COMMENTS_COUNT;

  @Transform(({ value }) => +value || MIN_PAGE)
  @IsOptional()
  public page: number = MIN_PAGE;
}
