import React from 'react';
import { render, fireEvent, act, cleanup, waitForElementToBeRemoved } from "@testing-library/react";
import App from './../App';
import { Router, Route, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const history = createMemoryHistory();
const mock = new MockAdapter(axios);

describe("App", () => {

	
	afterEach(() => {
		cleanup()
	})
	

	test('mounts with Router & without crashing', async () =>  {

		await act( async () => {
			const { getByText, debug } = render(
				<Router history={history}>
					<Route>
						<App/>
					</Route>
				</Router>
			);
		})
		
	
	});

	
	test('displays loading indicator', async () =>  {

		await act( async () => {
			const { getByTestId, debug } = render(<App/>);
			expect(getByTestId('loading-indicator')).toBeInTheDocument();
		});
		
	
	});

	test('display an error message if the backend is acting bad', async () =>  {

		mock.onGet('http://localhost:3001/posts').reply(500);

		await act( async () => {
			const { getByTestId, debug, getByText } = render(<App/>);
			await waitForElementToBeRemoved(() => getByTestId('loading-indicator'))
			expect(getByTestId('error-message')).toBeInTheDocument()
		});
	
	});

	test('succesfully fetches posts', async () =>  {

		mock.onGet('http://localhost:3001/posts').reply(200, {
			data: ['some', 'posts']
		});

		await act( async () => {
			const { getByTestId, debug, getByText } = render(<App/>);
			await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
			expect(getByTestId('feed')).toBeInTheDocument();
		});

	
	});

});