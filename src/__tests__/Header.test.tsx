import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from './../components/Header';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { GetUser, Logout } from './../store/user/actions';
import { Router, Route } from 'react-router-dom'
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from 'history'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const mock = new MockAdapter(axios);
const history = createMemoryHistory();

describe("Header", () => {

    afterEach(() => {
		cleanup()
	})
	

    test('renders logged-in user UI', () => {
    
        let store = mockStore({
            user: {
                data: 'some_user', loading: false
            }
        });
    
        const { getByText, debug } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Route>
                        <Header/>
                    </Route>
                </Router>
            </Provider>
        );
        expect(getByText("Logout")).toBeTruthy();
    
    });
    
    test('renders guest UI', () => {
        
        let store = mockStore({
            user: {
                data: null, loading: false
            }
        });
    
        const { getByText, debug } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Route>
                        <Header/>
                    </Route>
                </Router>
            </Provider>
        );
        expect(getByText("Login")).toBeTruthy();
    
    });
    
    
    test('can dispatch GetUser() action', () => {
    
        mock.onGet('http://localhost:3000/login/success').reply(200, {
            dummy: "user"
        });
    
        let store = mockStore({});
    
        store.dispatch(GetUser()).then(() => {
            let expectedActions = [
                { 
                    type: 'LOAD_USER', 
                    payload: true 
                },
                {
                    type: 'GET_USER',
                    payload: { dummy: 'user'}
                }
            ]
            
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    
    });
    
    test('can dispatch Logout() action', () => {
    
        mock.onGet('http://localhost:3000/logout').reply(200, {
            loggedin: false
        });
    
        let store = mockStore({});
    
        store.dispatch(Logout()).then(() => {
    
            let expectedActions =  [ { type: 'LOGOUT' } ]
            
            expect(store.getActions()).toEqual(expectedActions);
    
        });
    
    });

})


