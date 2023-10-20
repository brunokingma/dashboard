import { Component, Input } from '@angular/core';
import { AcessosService } from 'src/app/service/acessos.service';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent {
  @Input() functionFromParent: ((data: any) => void) | undefined;
  @Input() totalPages: number = 0;
  @Input() last: boolean = false;
  @Input() first: boolean = false;
  active: number = 1;

  constructor(private acessoService: AcessosService) {
  }

  requestData(pagina: number): void {
    this.active = pagina;
    if (this.functionFromParent) {
      this.functionFromParent(pagina - 1);
    }
    
  }

  numberToArray(num: number): number[] {
    return Array.from({ length: num }, (_, i) => i + 1);
  }
}
