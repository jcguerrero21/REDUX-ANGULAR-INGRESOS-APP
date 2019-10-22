import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, ClearUserAction } from './auth.action';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2'
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(private _afAuth: AngularFireAuth,
    private _router: Router,
    private _afDB: AngularFirestore,
    private _store: Store<AppState>) { }

  initAuthListener() {
    this._afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this._afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuario: any) => {
            const newUser = new User(usuario);
            this._store.dispatch(new SetUserAction(newUser));
            this.usuario = newUser;
          });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this._store.dispatch(new ActivarLoadingAction());

    this._afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {

      const user: User = {
        uid: res.user.uid,
        nombre: nombre,
        email: res.user.email
      };

      this._afDB.doc(`${user.uid}/usuario`)
        .set(user)
        .then(() => {
          this._store.dispatch(new DesactivarLoadingAction());
          this._router.navigate(['/']);
        });

    }).catch(error => {
      console.error(error);
      this._store.dispatch(new DesactivarLoadingAction());
      Swal.fire('Error al crear usuario', error.message, 'error');
    });
  }

  login(email: string, password: string) {

    this._store.dispatch(new ActivarLoadingAction());

    this._afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      this._store.dispatch(new DesactivarLoadingAction());
      this._router.navigate(['/']);
    }).catch(error => {
      console.log(error);
      this._store.dispatch(new DesactivarLoadingAction());
      Swal.fire('Error en el login', error.message, 'error');
    });
  }

  cerrarSesion() {
    this._router.navigate(['/login']);
    this._afAuth.auth.signOut();

    this._store.dispatch(new ClearUserAction());
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

  getUsuario(){
    return { ...this.usuario };
  }

}
