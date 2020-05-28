import {
    UserActionTypes,
    UserStateStructure,
    GET_USER,
    LOAD_USER,
    THROW_ERROR,
    LOGOUT,
    SET_THEME
} from './types'

const initialState: UserStateStructure = {
    data: null,
    loading: true,
    error: false,
    error_text: '',
    theme: 'dark'
}
 
export function userReducer(
    state = initialState,
    action: UserActionTypes
): UserStateStructure {

    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false,
                error_text: ''
            }
        case LOAD_USER:
            return {
                ...state,
                loading: action.payload,
                error: false,
                error_text: ''
            }
        case THROW_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                error_text: action.payload.error_text
            }
        case LOGOUT:
            return {
                ...state,
                loading: false,
                error: false,
                error_text: '',
                data: null
            }
        case SET_THEME:
            return {
                ...state,
                theme: action.payload
            } 
        default:
            return state
    }

}