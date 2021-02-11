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
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { GOOGLE_CLIENT_ID } from '../common/mydotenv';

const SignIn = props => {
	const classes = useStyles(props);
	const [googleResp, setGoogleResp] = useState({});
	const responseGoogle = res => setGoogleResp(res);

	return (
		<Box width="100vw" height="100vh" className={classes.mainContainer}>
			<FormControl className={classes.signInForm}>
				<Box className={classes.heading}>
					<BallotIcon fontSize="large" className={classes.icon} />
					<Typography variant="h4" gutterBottom={true} className={classes.title}>
						Status Reporting Tool
					</Typography>
				</Box>

				<Typography variant="h4" gutterBottom={true} className={classes.loginUsing}>
					------------------- Login -------------------
				</Typography>

				<Box className={classes.socialLogin}>
					<GoogleLogin
						className="googleLogin"
						clientId={GOOGLE_CLIENT_ID}
						buttonText="Login"
						cookiePolicy={'single_host_origin'}
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
					/>
					<LinkedIn
						className="googleLogin"
						clientId="81lx5we2omq9xh"
						redirectUri="http://localhost:3000/linkedin"
					>
						<img src={linkedin} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
					</LinkedIn>
				</Box>
			</FormControl>
		</Box>
	);
};

export default SignIn;
