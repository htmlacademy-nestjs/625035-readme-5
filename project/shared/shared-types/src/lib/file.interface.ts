export interface File {
  createdAt?: Date;
  hashName: string;
  id?: string;
  mimetype: string;
  originalName: string;
  path: string;
  size: number;
  subDirectory: string;
  updatedAt?: Date;
}
