import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent {

@Input() functionFromParent: (( termo: string ) => void) | undefined;
@Input() placeholderText: string = "";

termo: string = "";

requestData(termo: string): void {
  if (this.functionFromParent) {
    this.functionFromParent(termo);
  }
}


}
