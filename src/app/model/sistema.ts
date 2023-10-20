import { STATUS } from '../enums/status'; 
import { ROLES } from '../enums/roles'; 
export interface Sistema {
  id?: string;
  nome?: string;
  descricao?: string;
  versao?: string;
  atualizacao?: Date;
  url?: string;
  status?: STATUS;
  role?:ROLES;
}
