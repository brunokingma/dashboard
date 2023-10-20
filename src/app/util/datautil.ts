
import { format } from 'date-fns';

export class datautil {


    static  dateFormat(date : Date) : string{
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
    }


}