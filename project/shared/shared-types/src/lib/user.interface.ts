export interface User {
  avatar?: Blob;
  dateOfRegistration: number;
  email: string;
  firstname: string;
  id?: string;
  lastname: string;
  publications: string[];
  subscribers: string[];
}
