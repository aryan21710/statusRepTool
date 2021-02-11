import React, { useEffect, useState, useRef } from 'react';
import LoginHeader from '../components/LoginHeader';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signUpAction, signInAction } from '../redux/action/LoginAction';
import { Box, FormControl, TextField, Typography, Button } from '@material-ui/core';
import { useStyles } from '../styles/materialUI/Signin';
import { signout, saveJwtToLocalStorage } from '../api/userAuth';
import BallotIcon from '@material-ui/icons/Ballot';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { GoogleLogin } from 'react-google-login';

const SignIn = props => {
	const classes = useStyles(props);
	return (
		<Box width="100vw" height="100vh" className={classes.mainContainer}>
			<FormControl className={classes.signInForm}>
				<Box className={classes.heading}>
					<BallotIcon fontSize="large" className={classes.icon} />
					<Typography variant="h4" gutterBottom={true} className={classes.title}>
						Status Reporting Tool
					</Typography>
				</Box>

				<TextField
					variant="standard"
					label="Email:-"
					className={classes.inputFields}
					type="email"
					InputLabelProps={{
						style: { color: '#fff' },
					}}
				/>
				<TextField
					label="Password:-"
					className={classes.inputFields}
					variant="standard"
					type="password"
					InputLabelProps={{
						style: { color: '#fff' },
					}}
				/>
				<Button
					style={{ margin: '3vh 0vw', fontSize: '1vw', padding: '1vh 5vw' }}
					size="large"
					variant="contained"
					color="secondary"
				>
					Login
				</Button>

				<GoogleLogin
					clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
					buttonText="Login"
					cookiePolicy={'single_host_origin'}
				/>
			</FormControl>
		</Box>
	);
};

export default SignIn;
