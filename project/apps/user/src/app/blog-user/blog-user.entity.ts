import { AuthUser } from '@project/shared/shared-types';
import { Entity } from '@project/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constants';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public avatar?: string;
  public dateOfRegistration: number;
  public email: string;
  public firstname: string;
  public id?: string;
  public lastname: string;
  public passwordHash: string;
  public publications: string[];
  public subscribers: string[];

  constructor(user: AuthUser) {
    this.populate(user);
  }

  static fromObject(user: AuthUser): BlogUserEntity {
    return new BlogUserEntity(user);
  }

  private populate(data: AuthUser): void {
    this.avatar = data.avatar;
    this.dateOfRegistration = new Date().getTime();
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.passwordHash = data.passwordHash;
    this.publications = [];
    this.subscribers = [];
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
      dateOfRegistration: this.dateOfRegistration,
      email: this.email,
      firstname: this.firstname,
      id: this.id,
      lastname: this.lastname,
      publications: this.publications,
      subscribers: this.subscribers,
    };
  }
}
