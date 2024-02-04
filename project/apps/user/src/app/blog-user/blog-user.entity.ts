import { AuthUser } from '@project/shared/shared-types';
import { Entity } from '@project/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constants';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public avatar?: string;
  public createdAt?: Date;
  public email: string;
  public firstname: string;
  public id?: string;
  public lastname: string;
  public passwordHash: string;
  public updatedAt?: Date;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  static fromObject(user: AuthUser): BlogUserEntity {
    return new BlogUserEntity(user);
  }

  private populate(data: AuthUser): void {
    this.avatar = data.avatar;
    this.createdAt = data.createdAt;
    this.email = data.email;
    this.firstname = data.firstname;
    this.id = data.id || data._id?.toString();
    this.lastname = data.lastname;
    this.passwordHash = data.passwordHash;
    this.updatedAt = data.updatedAt;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toPOJO() {
    return {
      avatar: this.avatar,
      createdAt: this.createdAt,
      email: this.email,
      firstname: this.firstname,
      id: this.id,
      lastname: this.lastname,
      passwordHash: this.passwordHash,
      updatedAt: this.updatedAt,
    };
  }
}
