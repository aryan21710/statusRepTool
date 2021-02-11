import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	mainContainer: {
		position: 'relative',
		top: 0,
		left: 0,
		padding: 0,
		margin: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	signInForm: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		alignItems: 'center',
		width: '27vw',
		background: 'rgba(0,0,0,0.8)',
		borderRadius: '20px',
		padding: '4vh 0vw',
	},
	inputFields: {
		width: '20vw',
		margin: '1vh 0vw',
		color: 'white',
		fontSize: '20px',
		borderBottom: '1px solid blue',
	},
	title: {
		color: 'white',
		marginTop: '5px',
	},
	heading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '55%',
	},
	icon: {
		color: 'white',
	},
});
