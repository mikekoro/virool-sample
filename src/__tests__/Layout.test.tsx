import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../Layout';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom'
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import { SnackbarProvider } from 'notistack';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe("Layout", () => {
    test('renders and is able to display its child components', async () =>  {

        let store = mockStore({
            user: {
                data: null,
                loading: true,
                error: false,
                error_text: '',
                theme: 'dark'
            }
        });
    
        const { getByText, debug } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Route>
                        <SnackbarProvider maxSnack={3}>
                            <Layout>
                                <div>Hello World</div>
                            </Layout>
                        </SnackbarProvider>
                    </Route>
                </Router>
            </Provider>
        );
    
        expect(getByText("Hello World")).toBeTruthy();
    
    });
})
