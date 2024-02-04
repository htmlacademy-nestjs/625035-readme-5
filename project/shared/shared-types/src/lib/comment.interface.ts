export interface Comment {
  createdAt?: Date;
  id?: string;
  publicationId?: string;
  userId: string;
  value: string;
}
