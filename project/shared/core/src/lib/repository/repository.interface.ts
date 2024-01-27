import { DefaultPojoType, Entity, EntityIdType } from './entity.interface';

export interface Repository<
  EntityType extends Entity<EntityIdType, PojoType>,
  PojoType = DefaultPojoType
> {
  deleteById(id: EntityType['id']): Promise<void>;
  findById(id: EntityType['id']): Promise<EntityType | null>;
  getAll(): Promise<EntityType[]>;
  save(entity: EntityType): Promise<EntityType>;
  update(id: EntityType['id'], entity: EntityType): Promise<EntityType>;
}
