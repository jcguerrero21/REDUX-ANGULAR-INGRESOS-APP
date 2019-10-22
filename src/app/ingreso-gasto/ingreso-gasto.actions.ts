import { Action } from '@ngrx/store';
import { IngresosGastos } from '../models/ingresos-gastos';


export const SET_ITEMS = '[Ingreso-Gasto] Set Items';
export const CLEAR_ITEMS = '[Ingreso-Gasto] Clear Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: IngresosGastos[]){}
}

export class ClearItemsAction implements Action {
    readonly type = CLEAR_ITEMS;
}

export type acciones = SetItemsAction | ClearItemsAction;