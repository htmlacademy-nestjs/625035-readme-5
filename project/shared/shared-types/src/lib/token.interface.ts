export interface Token {
  id?: string;
  tokenId: string;
  userId: string;
  createdAt?: Date;
  expiresIn: Date;
}
