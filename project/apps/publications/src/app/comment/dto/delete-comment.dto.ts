import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCommentDto {
  @IsNotEmpty()
  @IsString()
  public userId: string;
}
