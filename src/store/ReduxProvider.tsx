import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./index";
import thunk from "redux-thunk";


interface Props {
    children: React.ReactNode
}

const ReduxProvider: React.FC<Props> = ({children}) => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const reduxStore = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
    return <Provider store={reduxStore}>{children}</Provider>
}

export default ReduxProvider;