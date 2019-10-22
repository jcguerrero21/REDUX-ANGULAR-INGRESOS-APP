import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresosGastos } from '../models/ingresos-gastos';
import { IngresoGastoService } from './ingreso-gasto.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-gasto',
  templateUrl: './ingreso-gasto.component.html',
  styles: []
})
export class IngresoGastoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(private _ingresoGastoService: IngresoGastoService,
    private _store: Store<AppState>) { }

  ngOnInit() { 
    this.loadingSubs = this._store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });

    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'cantidad': new FormControl(0, Validators.min(1))
    });
  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }

  crearIngresoGasto() {
    this._store.dispatch(new ActivarLoadingAction());

    const ingresoGasto = new IngresosGastos({
      ...this.form.value, tipo: this.tipo
    });

    this._ingresoGastoService.crearIngresoGasto(ingresoGasto)
      .then(() => {
        this._store.dispatch(new DesactivarLoadingAction());
        this.form.reset({ cantidad: 0 });
        Swal.fire('Creado', `Tipo: ${ingresoGasto.tipo} &rarr; ${ingresoGasto.descripcion}`, 'success');
      }).catch(error => {
        console.log(error);
        Swal.fire('Error', error, 'error');
        this._store.dispatch(new ActivarLoadingAction());
      });

  }

}
