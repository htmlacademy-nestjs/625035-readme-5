export interface User {
  avatar?: string;
  createdAt: Date;
  email: string;
  firstname: string;
  id?: string;
  lastname: string;
  publications: string[];
  subscribers: string[];
}
