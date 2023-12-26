import { Document, Model } from 'mongoose';

import { Entity, EntityIdType } from './entity.interface';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityIdType>,
  DocumentType extends Document
> {
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  protected createEntityFromDocument(document: DocumentType): EntityType {
    return this.createEntity(document.toObject({ versionKey: false }));
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();
    entity.id = newEntity._id.toString();

    return entity;
  }

  public async update(
    id: EntityType['id'],
    entity: EntityType
  ): Promise<EntityType> {
    const updateDocument = await this.model
      .findByIdAndUpdate(id, entity.toPOJO(), {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updateDocument) {
      throw new NotFoundException(
        `Entity with id: ${id} not found while updating`
      );
    }

    return entity;
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(
        `Entity with id ${id} not found while deleting`
      );
    }
  }
}
