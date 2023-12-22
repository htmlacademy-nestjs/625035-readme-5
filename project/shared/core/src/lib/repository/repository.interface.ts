import { Entity, EntityIdType } from './entity.interface';

export interface Repository<T extends Entity<EntityIdType>> {
  deleteById(id: T['id']): Promise<void>;
  findById(id: T['id']): Promise<T | null>;
  getAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  update(id: T['id'], entity: T): Promise<T>;
}
