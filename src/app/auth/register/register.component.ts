import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(datos: any): void {
    this._authService.crearUsuario(datos.nombre, datos.email, datos.password);
  }

}
