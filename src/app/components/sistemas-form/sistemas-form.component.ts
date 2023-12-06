import { Component, Inject, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sistema } from 'src/app/model/sistema';
import { Usuario } from 'src/app/model/usuario';
import { SistemasService } from 'src/app/service/sistemas.service';


@Component({
  selector: 'app-sistemas-form',
  templateUrl: './sistemas-form.component.html',
  styleUrls: ['./sistemas-form.component.scss'],

})
export class SistemaFormComponent {
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  sistema: Sistema = {}
  submitted = false;
  success = false;
  msgerror: any = "";
  msgerrordialog: boolean = false;
  id: string = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data: { sistema: Sistema }, private snackbar: MatSnackBar, private formBuilder: FormBuilder, public sistemasService: SistemasService) {
    const sistemaData = data.sistema ? data.sistema : {};

    this.form = this.formBuilder.group({
      nome: [sistemaData.nome || '', Validators.required],
      descricao: [sistemaData.descricao || '', [Validators.required]],
      status: [sistemaData.status || '', Validators.required],
      url: [sistemaData.url || '', Validators.required],
      versao: [sistemaData.versao || '', Validators.required],
      ip: [sistemaData.ip || '', Validators.required]

    });

    this.id = sistemaData.id || '';
  }


  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackbar.open(message, action,
      {
        duration: 3000,
        panelClass: [panelClass] //custom-style-danger custom-style-success
      });
  }

  reloadPage() {
    this.form.reset();
    if (this.success)
      window.location.reload()
  }

  onSubmit() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });

    this.submitted = true;
    this.msgerrordialog = false;
    this.success = false;

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    if (this.id !== "") {
      this.updateSistema(formData);
    } else {
      this.addSistema(formData);
    }
  }



  private addSistema(formData: any) {
    const sistema = this.createSistemaFromFormData(formData);
    try {
      this.sistemasService.add(sistema).subscribe(() => {
        this.openSnackBar("Os dados foram salvos com sucesso!", "Fechar", "custom-style-success");
        this.form.reset();
        this.formSubmitted.emit();
        this.success = true;
      })
    } catch (error) {
      this.handleError(error);
    }
  }

  private updateSistema(formData: any) {
    const updatedSistema = this.createSistemaFromFormData(formData);
    updatedSistema.id = this.id;
    try {
      this.sistemasService.updateSistema(updatedSistema).subscribe(() => {
        this.openSnackBar("Os dados foram atualizados com sucesso!", "Fechar", "custom-style-success");
        this.id = "";
        this.form.reset();
        this.formSubmitted.emit(); // Emit event upon successful submission
        this.success = true;
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private createSistemaFromFormData(formData: any): Sistema {
    return {
      nome: formData.nome,
      descricao: formData.descricao,
      url: formData.url,
      versao: formData.versao,
      status: formData.status,
      ip: formData.ip
    };
  }

  private handleError(error: any) {
   // this.msgerrordialog = true;
   // this.msgerror = error;
    this.openSnackBar(error, "Fechar", "custom-style-danger");
  }
}
