import { Sistema } from './sistema';
import { Usuario } from './usuario';
export interface Acesso {
  id?: String;
  sistema: Array<Sistema>;
  usuario: Usuario;
}
