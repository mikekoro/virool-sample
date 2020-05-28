import React, {useEffect, Fragment, ReactNode, useState} from 'react';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useSelector } from './store';
import { useLocation, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';

interface Props {
	children: ReactNode
}

const Layout: React.FC<Props> = ({children}) => {

	// Redux
	const dispatch = useDispatch();
	const redux = useSelector(state => state);

	// Router helpers stuff
	const location = useLocation();
	const history = useHistory();

	// Notifications
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {

		if(location.search === "?success") {
			enqueueSnackbar("Hi there!", { 
				variant: 'success'
			});
			history.push("/");
		} else if(location.search === "?failure") {
			enqueueSnackbar("Error! Could not log you in.", { 
				variant: 'error'
			});
		}

	},[])


	return (
		<Fragment>
			<Header/>
			{
				children
			}
		</Fragment>
	)

}

export default Layout;