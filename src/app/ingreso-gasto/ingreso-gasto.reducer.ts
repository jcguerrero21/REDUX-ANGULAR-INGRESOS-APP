import * as fromIngresoGasto from './ingreso-gasto.actions';
import { IngresosGastos } from '../models/ingresos-gastos';
import { AppState } from '../app.reducer';

export interface IngresoGastoState {
    items: IngresosGastos[];
}

export interface AppState extends AppState {
    IngresosGastos: IngresoGastoState;
}

const estadoInicial: IngresoGastoState = {
    items: []
};

export function ingresoGastoReducer(state = estadoInicial,
    action: fromIngresoGasto.acciones): IngresoGastoState {

    switch (action.type) {

        case fromIngresoGasto.SET_ITEMS: //de esta forma lo hacemos mejor para no tenerlo que pasar por referencia
            return {
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item
                        };
                    })
                ]
            };

        case fromIngresoGasto.CLEAR_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }

}