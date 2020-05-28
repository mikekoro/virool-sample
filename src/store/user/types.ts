export const GET_USER = 'GET_USER'
export const LOAD_USER = 'LOAD_USER'
export const THROW_ERROR = 'THROW_ERROR'
export const LOGOUT = 'LOGOUT'
export const SET_THEME = 'SET_THEME'

/* ----- */

export interface UserStateStructure {
    data: User | null;
    loading: boolean;
    error: boolean;
    error_text: string;
    theme: string;
}

export interface User {
    username: string,
    email: string,
    avatar: string
}

export interface Error {
    error: boolean,
    error_text: string;
}

/* ----- */

interface GetUser {
    type: typeof GET_USER
    payload: User
}

interface LoadUser {
    type: typeof LOAD_USER
    payload: boolean
}

interface ThrowError {
    type: typeof THROW_ERROR
    payload: Error
}

interface Logout {
    type: typeof LOGOUT
    payload: boolean
}

interface SetUserTheme {
    type: typeof SET_THEME
    payload: string
}

export type UserActionTypes = GetUser | LoadUser | ThrowError | Logout | SetUserTheme;