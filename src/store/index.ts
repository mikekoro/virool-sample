import { combineReducers } from 'redux';
import { userReducer } from './user/reducers'
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const rootReducer = combineReducers({
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
