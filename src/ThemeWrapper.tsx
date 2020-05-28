import React, {useEffect, Fragment, ReactNode, useState} from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { useSelector } from './store/';

interface Props {
	children: ReactNode
}

const ThemeWrapper: React.FC<Props> = ({children}) => {

	const redux = useSelector(state => state);

	let rest = {
		overrides: {
			MuiGrid: {
				  container: {
					width: "100% !important",
					margin: "0 !important"
				  }
			}
		}
	}

	let darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
			secondary: deepOrange,
			background: {
				default: '#222'
			}
		}, ...rest
	});

	let lightTheme = createMuiTheme({
		palette: {
			type: 'light',
			secondary: deepOrange
		}, ...rest
	});

	return (
		<MuiThemeProvider theme={redux.user.theme === "dark" ? darkTheme : lightTheme}>
			{children}
		</MuiThemeProvider>
	)

}

export default ThemeWrapper;