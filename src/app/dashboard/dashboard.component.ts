import { Component, OnInit } from '@angular/core';
import { IngresoGastoService } from '../ingreso-gasto/ingreso-gasto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  constructor(private _ingresoGastoService: IngresoGastoService) { }

  ngOnInit() {
    this._ingresoGastoService.initIngresoGastoListener();
  }

}
