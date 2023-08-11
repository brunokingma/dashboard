import { Sistema } from './sistema';

export interface Usuario {
  id?: number;
  nome?: String;
  email?: String;
  login?: String;
  senha?: String;
  acesso?: [Sistema];
}
