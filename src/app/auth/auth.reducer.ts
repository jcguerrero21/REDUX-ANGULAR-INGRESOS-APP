import * as fromAuth from './auth.action';
import { User } from '../models/user';

export interface AuthState {
    user: User
};

const estadoInicial: AuthState = {
    user: null
};

export function authReducer(state = estadoInicial, action: fromAuth.acciones): AuthState {

    switch (action.type) {

        case fromAuth.SET_USER:
            return {
                user: { ...action.user }
            };

        default:
            return state;
    }

}