import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ThemeSwitcher from './../components/ThemeSwitcher';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { SetTheme } from './../store/user/actions';
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";


const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const mock = new MockAdapter(axios);

describe("ThemeSwitcher", () => {

	test('switches from light to dark theme', () => {
		
		let store = mockStore({
			user: {
				theme: 'light'
			}
		});

		const { queryByTestId } = render(<Provider store={store}><ThemeSwitcher/></Provider>);
		const checkbox = queryByTestId('theme-swicther').querySelector('input[type="checkbox"]');

		expect(checkbox).toHaveProperty('checked', false) // original state dark theme equals "false"
		fireEvent.click(checkbox);
		expect(checkbox).toHaveProperty('checked', true) // dark theme equals "true"

	});

	test('can dispatch SetTheme("light") action which can effectivly enables light theme', () => {

		let store = mockStore({
			user: {
				theme: 'dark'
			}
		});
		
		store.dispatch(SetTheme("light"));

		let expectedActions = [ { type: 'SET_THEME', payload: 'light' } ];
		expect(store.getActions()).toEqual(expectedActions);

	});

})


