import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afAuth: AngularFireAuth,
    private _router: Router) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this._afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log(res);
      this._router.navigate(['/']);
    })
      .catch(error => {
        console.error(error);
        Swal.fire('Error al crear usuario', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log(res);
      this._router.navigate(['/']);
    }).catch(error => {
      console.log(error);
      Swal.fire('Error en el login', error.message, 'error');
    });
  }
}
