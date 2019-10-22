import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresosGastos } from '../../models/ingresos-gastos';
import { Subscription } from 'rxjs';
import { IngresoGastoService } from '../ingreso-gasto.service';
import Swal from 'sweetalert2';

import * as fromIngresoGasto from '../ingreso-gasto.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresosGastos[];
  subcription: Subscription = new Subscription();

  constructor(private _Store: Store<fromIngresoGasto.AppState>,
    private _ingresoGastoService: IngresoGastoService) { }

  ngOnInit() {
    this.subcription = this._Store.select('ingresosGastos')
      .subscribe(ingresoGasto => {
        this.items = ingresoGasto.items;
      });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  borrarItem(item: IngresosGastos) {
    Swal.fire({
      title: '¿Deseas eliminar el registro?',
      text: item.descripcion,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this._ingresoGastoService.borrarIngresoGasto(item.uid)
          .then(() => {
            Swal.fire('Eliminado', item.descripcion, 'success');
          });
      }
    });
  }

}
