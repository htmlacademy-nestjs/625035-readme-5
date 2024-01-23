import { PrismaClientService } from '@project/shared/publications/models';
import { DefaultPojoType, Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

// ? что тут происходит с типизацией
export abstract class BasePostgresRepository<
  EntityType extends Entity<EntityIdType, DocumentType>,
  DocumentType = DefaultPojoType
> implements Repository<EntityType, DocumentType>
{
  constructor(
    protected readonly client: PrismaClientService,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  // ? record - это ответ от бд?
  // ? если это ответ от бд, то почему он типа DefaultPojoTyp, а не обычного объекта?
  protected createEntityFromDocument(
    document: DocumentType
  ): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document);
  }

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    throw new Error('Not implemented');
  }

  public async save(entity: EntityType): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async update(
    id: EntityType['id'],
    entity: EntityType
  ): Promise<EntityType> {
    throw new Error('Not implemented');
  }

  public async getAll(): Promise<EntityType[]> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
