import { TokenPayload, User } from '@project/shared/shared-types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
  };
}
