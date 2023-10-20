import { STATUS } from '../enums/status';
import { Sistema } from './sistema';

export interface Usuario {
  id?: string;
  nome?: string;
  email?: string;
  login?: string;
  password?: string;
  sistemas?: [Sistema];
  status?:STATUS;
  role?:string;
}
