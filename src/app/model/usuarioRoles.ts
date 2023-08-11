import { Sistema } from './sistema';
import { Usuario } from './usuario';

export interface Roles {
  usuario: Usuario;
  sistema: Sistema;
  roles: [Roles];
}
