import React, { Fragment,  useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

const PostCreator: React.FC = () => {

	const [state, setState] = useState<string>('');
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [response, setResponse] = useState<any | null>(null);
	
	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setSubmitting(true)
		try {
			const response = await axios.get(`http://localhost:3001/submit`);
			const { data } = response;
			setResponse(data)
			setState('')
		} catch(error) {
			setError(true)
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState(e.currentTarget.value)
	}

	return (
		<Fragment>
			<form
				onSubmit={handleSubmit}
				data-testid="post-creator"
			>

				{
					error ? <Alert severity="error" className="mb-3" data-testid="error-message">Error! Something went wrong.</Alert> : null	
				}

				{
					response ?  <Alert severity="success" className="mb-3" data-testid="success-message">You link has been submitted!</Alert> : null
				}
			
					<TextField 
						fullWidth
						className="mb-3"
						label="Your Twitter Link"
						variant="outlined" 
						name="link"
						onChange={handleChange}
						required={true}
						inputProps={{ "data-testid": "input-field" }}
					/>
		

				<Button 
					disabled={submitting}
					data-testid="submit-button"
					variant="contained" 
					color="primary" 
					type="submit">Submit
				</Button>

			</form>
		</Fragment>
	)


}

export default PostCreator;