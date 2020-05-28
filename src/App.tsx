import React, { useEffect,useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import useGetPosts from './helpers/useGetPosts';
import PostCreator from './components/PostCreator';

const App: React.FC<RouteComponentProps> = ({ history, location, match }) => {

	const { data, error, loading, getDataFromUrl } = useGetPosts();

	useEffect(() => {
		getDataFromUrl('http://localhost:3001/posts')
	}, [])
	
	const LoadMorePosts = () => {
		getDataFromUrl('http://localhost:3001/posts?page=1')
	}

	return (
		<React.Fragment>

			<div className="container">
				<div className="row mt-3 justify-content-center">
					<div className="col-md-8 col-12">
						<PostCreator/>
					</div>
				</div>
				<div className="row mt-3 justify-content-center">
					<div className="col-md-8 col-12">

						{
							loading ? <LinearProgress data-testid="loading-indicator"/> : null
						}

						{
							error && !loading ? <Alert severity="error" className="mb-3" data-testid="error-message">Error! Could not fetch posts.</Alert> : null	
						}

						{
							data && !loading ? <div data-testid="feed">Feed</div> : null
						}

						<div className="text-center">	
							<Button 
								size="small"
								color="default" 
								variant="contained" 
								disabled={error}
								onClick={LoadMorePosts} 
								data-testid="load-more-button">
									Load More Posts
							</Button>
						</div>

					</div>
				</div>
			</div>

		</React.Fragment>
	)

}

export default App;