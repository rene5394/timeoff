import { IImage } from "./IImage";

export interface IUser {
  id: number;
  email: string;
  code: string;
  firstname: string;
  secondname: string;
  lastname: string;
  secondlastname: string;
  hiredate: Date;
  role_id: number;
  status_id: number;
  hr: number;
  images: IImage[];
}
  