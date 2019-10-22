import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoGastoComponent } from './ingreso-gasto.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { OrdenIngresoGastoPipe } from './orden-ingreso-gasto.pipe';

//Gráficas
import { ChartsModule } from 'ng2-charts';

//Módulos personalizados
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoGastoReducer } from './ingreso-gasto.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoGastoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenIngresoGastoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresosGastos', ingresoGastoReducer)
  ]
})
export class IngresoGastoModule { }
