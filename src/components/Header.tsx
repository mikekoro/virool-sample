import React, { useEffect, useState } from 'react';
import { useSelector } from './../store/';
import { useDispatch } from 'react-redux';
import { Logout, GetUser } from './../store/user/actions';
import {  Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {

	const [loggedin, setLoggedIn] = useState<boolean>(false);
	const dispatch = useDispatch();
	const redux = useSelector(state => state);

	useEffect(() => {
		dispatch(GetUser()) // Try to get user data
	},[])

	useEffect(() => {

		if(!redux.user.loading && !redux.user.data) {
			setLoggedIn(false);
		} else if(!redux.user.loading && redux.user.data) {
			setLoggedIn(true);
		}
		
	},[redux.user]);

	const processLogin = () => {
		window.open("http://localhost:3000/twitter", "_self");	
	}

	const processLogout = () => {
		dispatch(Logout())
	}
	
	return (
		<AppBar position="static">
			<Toolbar>
				<div className="row w-100 align-items-center mx-0">
					<div className="col-6 d-flex align-items-center pl-0">
						<Link to={"/"}>
							<WhatshotIcon style={{fill:'#FF5454', fontSize: '30px'}} className="mr-1"/>
						</Link>
						<Typography variant="h6">
							Virales
						</Typography>
					</div>
					<div className="col-6 d-flex justify-content-end pr-0">
						<ThemeSwitcher/>

						<div className="ml-3">{
							loggedin ? 
								<Button 
									variant="contained" 
									onClick={processLogout}
									color="default">Logout</Button> : 
								<Button 
									variant="contained" 
									onClick={processLogin}
									color="default">Login</Button>
						}</div>
					</div>
				</div>
			</Toolbar>
		</AppBar>
	)

}

export default Header;