import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { LikeEntity } from './like.entity';
import { LikeRepository } from './like.repository';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public async create(dto: LikeDto, publicationId: string) {
    const existLike = await this.likeRepository.find(dto.userId, publicationId);

    if (existLike) {
      throw new ConflictException('already liked');
    }

    const newLike = new LikeEntity({ ...dto, publicationId });
    return await this.likeRepository.save(newLike);
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
    const existLike = await this.likeRepository.find(userId, publicationId);

    if (!existLike) {
      throw new NotFoundException('Like not found');
    }

    return await this.likeRepository.deleteById(existLike.id);
  }

  public async countLikes(publicationId: string): Promise<number> {
    return await this.likeRepository.countLikes(publicationId);
  }
}
