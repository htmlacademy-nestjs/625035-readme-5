export interface User {
  avatar?: Blob;
  dateOfRegistration: Date;
  email: string;
  firstname: string;
  id?: string;
  lastname: string;
  password: string;
  publications: string[];
  subscribers: string[];
}
