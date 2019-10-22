import { Pipe, PipeTransform } from '@angular/core';
import { IngresosGastos } from '../models/ingresos-gastos';

@Pipe({
  name: 'ordenIngresoGasto'
})
export class OrdenIngresoGastoPipe implements PipeTransform {

  transform(items: IngresosGastos[]): IngresosGastos[] {
    return items.sort(item => {
      if (item.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
