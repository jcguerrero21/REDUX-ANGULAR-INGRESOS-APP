import { User } from '../models/user';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] Set User';
export const CLEAR_USER = '[Auth] Clear User'

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: User) { }
}

export class ClearUserAction implements Action {
    readonly type =CLEAR_USER;
}

export type acciones = SetUserAction | ClearUserAction;