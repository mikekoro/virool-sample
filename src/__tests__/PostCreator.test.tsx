import React from 'react';
import { render, fireEvent, waitForElement, cleanup, act } from '@testing-library/react';
import PostCreator from './../components/PostCreator';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("PostCreator", () => {
	
	afterEach(() => {
		cleanup()
	})

	test('Form component mounts without crashing & renders its main elements', async () =>  {

        const { getByTestId } = render(<PostCreator/>);
        expect(getByTestId('post-creator')).toBeInTheDocument();
        expect(getByTestId('input-field')).toBeInTheDocument();
        expect(getByTestId('submit-button')).toBeInTheDocument();
	
    });

    test('User can type in the text field', async () =>  {

        const { getByTestId, debug } = render(<PostCreator/>);
        const input_field = getByTestId('input-field');
        fireEvent.change(input_field, { target: { value: 'Hello world!' } })
        expect(input_field.value).toEqual('Hello world!')
	
    });

    test('User can submit form & see the success message', async () =>  {

        mock.onGet('http://localhost:3001/submit').reply(200, {
            data: "success"
        });
        
        const { getByTestId } = render(<PostCreator/>);
        const form = getByTestId('post-creator');
        const input_field = getByTestId('input-field');
        fireEvent.change(input_field, { target: { value: 'Valid URL' } })

        await act( async () => {
            fireEvent.submit(form);
        });

        expect(getByTestId('success-message')).toBeInTheDocument();        
	
    });

    test('User can submit the form but something goes wrong on the backend and the error message is shown', async () =>  {

        mock.onGet('http://localhost:3001/submit').reply(500);
        
        const { getByTestId } = render(<PostCreator/>);
        const form = getByTestId('post-creator');
        const input_field = getByTestId('input-field');
        fireEvent.change(input_field, { target: { value: 'Invalid URL' } }) // assume our backend wont parse the supplied URL

        await act( async () => {
            fireEvent.submit(form);
        });

        expect(getByTestId('error-message')).toBeInTheDocument();        
	
    });


});