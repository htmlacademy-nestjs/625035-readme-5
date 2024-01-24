import { Module } from '@nestjs/common';
import { PublicationModule } from './publication/publication.module';
import { PublicationController } from './publication/publication.controller';

@Module({
  imports: [PublicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
