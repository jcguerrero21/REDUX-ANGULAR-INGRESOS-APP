import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoGasto from './ingreso-gasto/ingreso-gasto.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    ingresoGasto: fromIngresoGasto.IngresoGastoState;
};

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    ingresoGasto: fromIngresoGasto.ingresoGastoReducer
};