import { Entity } from '@project/shared/core';
import { Subscriber } from '@project/shared/shared-types';

export class EmailSubscriberEntity
  implements Subscriber, Entity<string, Subscriber>
{
  public id?: string;
  public email: string;
  public firstname: string;
  public lastname: string;

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity().populate(data);
  }

  public toPOJO() {
    return {
      email: this.email,
      firstname: this.firstname,
      id: this.id,
      lastname: this.lastname,
    };
  }

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.id = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;

    return this;
  }
}
