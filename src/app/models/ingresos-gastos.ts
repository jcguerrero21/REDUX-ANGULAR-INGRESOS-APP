import { isObject } from 'util';

export class IngresosGastos {

    descripcion: string;
    cantidad: number;
    tipo: string;
    uid?: string;

    constructor(obj: IngresosGastoObj) {
        this.descripcion = obj && obj.descripcion || null;
        this.cantidad = obj && obj.cantidad || null;
        this.tipo = obj && obj.tipo || null;
        // this.uid = obj && obj.uid || null;
    }

}

interface IngresosGastoObj {
    descripcion: string;
    cantidad: number;
    tipo: string;
    uid: string;
}