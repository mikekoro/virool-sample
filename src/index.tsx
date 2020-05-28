import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './Layout';
import ThemeWrapper from './ThemeWrapper';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

// Redux Imports
import ReduxProvider from "./store/ReduxProvider";

ReactDOM.render(
  	<React.StrictMode>
		<ReduxProvider>
			<ThemeWrapper>
				<CssBaseline />
				<Router>
					<SnackbarProvider maxSnack={3}>
						<Layout>
							<Route path="/" exact component={App} />
						</Layout>
					</SnackbarProvider>
				</Router>
			</ThemeWrapper>
		</ReduxProvider>
  	</React.StrictMode>,
  	document.getElementById('root')
);
