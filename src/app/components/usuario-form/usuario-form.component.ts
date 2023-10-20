import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sistema } from 'src/app/model/sistema';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AcessosService } from 'src/app/service/acessos.service';
import { Acesso } from 'src/app/model/acesso';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],

})
export class UsuarioFormComponent {

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();


  form: FormGroup;
  usuario: Usuario = {}
  sistema: Sistema = {}
  submitted = false;
  success = false;
  sistemasSelecionados: Array<Sistema> = [];
  msgerror: any = "";
  msgerrordialog: boolean = false;
  id:string="";
  updatePassword:string = "" ;



  constructor(@Inject(MAT_DIALOG_DATA) public data: { sistemas: Array<Sistema>, acesso: Acesso }, private snackbar: MatSnackBar, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private acessoService: AcessosService) {
    const usuarioData = data.acesso ? data.acesso.usuario : {}; 
    const sistemaData = data.acesso ? data.acesso.sistema : []; 

    this.form = this.formBuilder.group({
        nome: [usuarioData.nome || '', Validators.required],
        email: [usuarioData.email || '', [Validators.required, Validators.email]],
        login: [usuarioData.login || '', Validators.required],
        senha: ['' , usuarioData.password ? [] : Validators.required],
        status: [usuarioData.status || '', Validators.required],
        sistema: [""],
        role: [usuarioData.role || '', Validators.required],
        role_sistema: ['']
       
    });
    this.updatePassword = usuarioData.password || "";
    this.sistemasSelecionados = sistemaData || [];
    this.id = usuarioData.id || '';
  }

  sistemaExistente(array: Array<Sistema>, sistema: Sistema): boolean {
    return array.some(s => s.id === sistema.id);
  }


  adicionarSistema() {
    if (this.form.value.sistema === "" || this.form.value.role_sistema === "") {
      return
    } 
    
    var sistema = this.form.value.sistema;
    sistema.role = this.form.value.role_sistema;

  if (!this.sistemaExistente(this.sistemasSelecionados,sistema) ) {
      this.sistemasSelecionados.push(sistema);
    }
    
  }


  excluirSistema(sistema: Sistema) {
    var array: Array<Sistema> = this.sistemasSelecionados;
    if (this.sistemasSelecionados.includes(sistema)) {
      const index = array.findIndex(item => item.id === sistema.id);
      array.splice(index, 1);
    }
    this.sistemasSelecionados = array;
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
    this.updateUser(formData);
  } else {
    this.addUser(formData);
  }
}



private addUser(formData: any) {
  const newUser = this.createUserFromFormData(formData);
  newUser.password = formData.senha;
  try {
    this.usuarioService.add(newUser).subscribe((user) => {
      const acesso = {
        usuario: user,
        sistema: this.sistemasSelecionados
      };
      this.acessoService.add(acesso).subscribe(() => {
        this.form.reset();
      //  this.success = true;
      this.openSnackBar("Os dados foram salvos com sucesso!", "Fechar", "custom-style-success");

        this.sistemasSelecionados = [];
        this.formSubmitted.emit();

      }, (error) => {
        this.handleError(error);
      });
    }, (error) => {
      this.handleError("Login já cadastrado no sistemas");
    });
  } catch (error) {
    this.handleError(error);
  }
}

private updateUser(formData: any) {

  const updatedUser = this.createUserFromFormData(formData);
  if (formData.senha !== "") {
    updatedUser.password = formData.senha;
  }else{
     updatedUser.password = "";
  }

  updatedUser.id = this.id;

  try {
    this.usuarioService.updateUsuario(updatedUser).subscribe((user) => {

      const acesso = {
        id:this.data.acesso.id,
        usuario: user,
        sistema: this.sistemasSelecionados
      };

      this.acessoService.update(acesso).subscribe(() => {
        this.form.reset();
      //  this.success = true;
      this.openSnackBar("Os dados foram atualizados com sucesso!", "Fechar", "custom-style-success");

        this.sistemasSelecionados = [];
        this.formSubmitted.emit();

      }, (error: any) => {
        this.handleError(error);
      });
    }, (error) => {
      this.handleError("Login já cadastrado no sistemas");
    });
  } catch (error) {
    this.handleError(error);
  }
}

private createUserFromFormData(formData: any): Usuario {
  return {
    nome: formData.nome,
    email: formData.email,
    login: formData.login,
    status: formData.status,
    role: formData.role,
  };
}

openSnackBar(message: string, action: string, panelClass: string) {
  this.snackbar.open(message, action,
    {
      duration: 3000,
      panelClass: [panelClass] //custom-style-danger custom-style-success
    });
}


private handleError(error: any) {
  // this.msgerrordialog = true;
  // this.msgerror = error;
   this.openSnackBar(error, "Fechar", "custom-style-danger");
 }

}
