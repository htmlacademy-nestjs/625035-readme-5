import { Injectable, Request } from '@nestjs/common';

import { LikeEntity } from './like.entity';
import { LikeRepository } from './like.repository';
import { AddLikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public async create(dto: AddLikeDto) {
    const newLike = new LikeEntity(dto);
    return this.likeRepository.save(newLike);
  }

  public async getLike(
    userId: string,
    publicationId: string
  ): Promise<LikeEntity> {
    return await this.likeRepository.find(userId, publicationId);
  }

  public async getLikesByIds(ids: string[]): Promise<LikeEntity[]> {
    return await this.likeRepository.findByIds(ids);
  }

  public async remove(publicationId: string, userId: string) {
    const { id } = await this.likeRepository.find(userId, publicationId);
    await this.likeRepository.deleteById(id);
  }

  public async countLikes(publicationId: string): Promise<number> {
    return await this.likeRepository.countLikes(publicationId);
  }
}
