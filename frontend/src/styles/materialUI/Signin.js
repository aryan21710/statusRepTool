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
		background: 'rgba(0,0,0,0.7)',
        borderRadius: '20px',
        padding: "5vh 0vw"

	},
	title: {
        color: 'white',
        marginTop: '5px'
	},
	heading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
        width: '53%',
    },
    socialLogin: {
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
        width: '90%',
    },
	icon: {
		color: 'white',
    },
    loginUsing:{
        margin: "6vh 0vw",
        color: 'white',
        fontSize: '0.8vw'
    }
});
