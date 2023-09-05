import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { DialogComponent } from '../dialog-component/dialog-component.component'; // Import your dialog component

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    // Open the dialog
    this.dialog.open(DialogComponent);
  }
}
