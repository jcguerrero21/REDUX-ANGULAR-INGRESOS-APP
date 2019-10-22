import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresosGastos } from '../../models/ingresos-gastos';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

import * as fromIngresoGasto from '../ingreso-gasto.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  gastos: number;

  cuantosIngresos: number;
  cuantosGastos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private _store: Store<fromIngresoGasto.AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('ingresosGastos')
      .subscribe(ingresoGasto => {
        this.contarIngresoGasto(ingresoGasto.items);
      });
  }

  contarIngresoGasto(items: IngresosGastos[]) {
    this.ingresos = 0;
    this.gastos = 0;

    this.cuantosGastos = 0;
    this.cuantosIngresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.cantidad;
      } else {
        this.cuantosGastos++;
        this.gastos += item.cantidad;
      }
    });

    this.doughnutChartData = [[this.ingresos, this.gastos]];

  }

}
