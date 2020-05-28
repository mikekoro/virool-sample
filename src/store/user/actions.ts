import { User, Error, UserActionTypes, GET_USER, LOAD_USER, THROW_ERROR, LOGOUT, SET_THEME } from './types'
import axios from 'axios';
import { Dispatch } from 'redux';

export function LoadUser(is_loading: boolean): UserActionTypes {
    
    return {
        type: LOAD_USER,
        payload: is_loading
    }
}

export const GetUser = () => async (dispatch: Dispatch): Promise<any> => {
//export const GetUser = async (disptach: Dispatch): Promise<any> => {

    dispatch({
        type: LOAD_USER,
        payload: true
    });

    try {
        const response = await axios.get(`http://localhost:3000/login/success`, { withCredentials: true });
        const { data } = response;

        dispatch({
            type: GET_USER,
            payload: data
        });
    } catch(err) {

        let error_object:Error = {
            error: true,
            error_text: 'Error! Something went wrong.' //err.response.data.message
        }

        dispatch({
            type: THROW_ERROR,
            payload: error_object
        });
        
    }

}

export function ThrowError(error: Error): UserActionTypes {
    return {
        type: THROW_ERROR,
        payload: error
    }
}

export const Logout = () => async (dispatch: Dispatch): Promise<any> => {

    try {
        const response = await axios.get(`http://localhost:3000/logout`, { withCredentials: true });
        const { data } = response;

        dispatch({
            type: LOGOUT
        });

    } catch(err) {

        let error_object:Error = {
            error: true,
            error_text: 'Error! Something went wrong.' //err.response.data.message
        }

        dispatch({
            type: THROW_ERROR,
            payload: error_object
        });
        
    }

}

export function SetTheme(type: string): UserActionTypes {
    return {
        type: SET_THEME,
        payload: type
    }
}
