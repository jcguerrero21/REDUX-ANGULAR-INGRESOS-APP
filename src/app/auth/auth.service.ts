import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

import Swal from 'sweetalert2'
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afAuth: AngularFireAuth,
    private _router: Router,
    private _afDB: AngularFirestore) { }

  initAuthListener() {
    this._afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this._afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {

      const user: User = {
        uid: res.user.uid,
        nombre: nombre,
        email: res.user.email
      };

      this._afDB.doc(`${user.uid}/usuario`)
        .set(user)
        .then(() => {
          this._router.navigate(['/']);
        })

    }).catch(error => {
      console.error(error);
      Swal.fire('Error al crear usuario', error.message, 'error');
    });
  }

  login(email: string, password: string) {
    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      this._router.navigate(['/']);
    }).catch(error => {
      console.log(error);
      Swal.fire('Error en el login', error.message, 'error');
    });
  }

  cerrarSesion() {
    this._router.navigate(['/login']);
    this._afAuth.auth.signOut();
  }

  isAuth() {
    return this._afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this._router.navigate(['/login']);
          }
          return fbUser != null
        })
      );
  }

}
