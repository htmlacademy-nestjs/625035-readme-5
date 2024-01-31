import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_COMMENTS_COUNT, MIN_PAGE } from '../comment.constant';

export class CommentQuery {
  @Transform(({ value }) => +value || MAX_COMMENTS_COUNT)
  @IsNumber()
  @IsOptional()
  public limit = MAX_COMMENTS_COUNT;

  @Transform(({ value }) => +value || MIN_PAGE)
  @IsOptional()
  public page: number = MIN_PAGE;
}
