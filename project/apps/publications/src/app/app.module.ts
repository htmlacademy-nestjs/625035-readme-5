import { Module } from '@nestjs/common';
import { PublicationModule } from './publication/publication.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PublicationModule, LikeModule, CommentModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
