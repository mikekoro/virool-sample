import React, { useEffect, useState } from 'react';
import Switch from '@material-ui/core/Switch';
import { useSelector } from './../store/';
import { useDispatch } from 'react-redux';
import { SetTheme } from './../store/user/actions';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

const CustomSwitch = withStyles({
	switchBase: {
		color: amber[300],
		'&$checked': {
			color: amber[300],
		},
	  	'&$checked + $track': {
			backgroundColor: amber[200],
	  	},
	},
	checked: {},
	track: {},
})(Switch);

const ThemeSwitcher: React.FC = () => {

	const dispatch = useDispatch();
	const redux = useSelector(state => state);
	const [state, setState] = useState<boolean>(redux.user.theme ===  "dark");

	useEffect(() => {
		
		if(state) {
			dispatch( SetTheme("dark") );
		} else {
			dispatch( SetTheme("light") );
		}
		
	},[state]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(event.target.checked);
	};

	return (
		<CustomSwitch
			data-testid="theme-swicther"
			checked={state}
			onChange={handleChange}
			color={state ? "secondary" : "default"}
			name="switcher"
			inputProps={{ 'aria-label': 'Theme Switcher' }}
		/>
	)

}

export default ThemeSwitcher;