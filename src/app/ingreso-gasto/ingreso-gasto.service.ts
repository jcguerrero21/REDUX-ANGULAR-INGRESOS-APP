import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresosGastos } from '../models/ingresos-gastos';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, ClearItemsAction } from './ingreso-gasto.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoGastoService {

  ingresoGastoListerSubcription: Subscription = new Subscription();
  ingresoGastoItemsSubcription: Subscription = new Subscription();

  constructor(private _afDB: AngularFirestore,
    private _authService: AuthService,
    private _store: Store<AppState>) { }

  initIngresoGastoListener() {
    this.ingresoGastoListerSubcription = this._store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.ingresoGastoItems(auth.user.uid);
      });
  }

  private ingresoGastoItems(uid: string) {
    this.ingresoGastoItemsSubcription = this._afDB.collection(`${uid}/ingresos-gastos/items`)
      .snapshotChanges()
      .pipe(
        map(docDatos => {
          return docDatos.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((coleccion: any[]) => {
        this._store.dispatch(new SetItemsAction(coleccion));
      });
  }

  cancerlarSubcriptions() {
    this.ingresoGastoListerSubcription.unsubscribe();
    this.ingresoGastoItemsSubcription.unsubscribe();
    this._store.dispatch(new ClearItemsAction());
  }

  crearIngresoGasto(ingresoGasto: IngresosGastos) {
    const user = this._authService.getUsuario();

    return this._afDB.doc(`${user.uid}/ingresos-gastos`)
      .collection('items').add({ ...ingresoGasto });
  }

  borrarIngresoGasto(uid: string) {
    const user = this._authService.getUsuario();

    return this._afDB.doc(`${user.uid}/ingresos-gastos/items/${uid}`)
      .delete();
  }

}
