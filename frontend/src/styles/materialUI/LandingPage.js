import { makeStyles } from '@material-ui/core/styles';
import backgroundImg from "../../images/office.png";
export const useStyles = makeStyles({
    parentContainer: {
      backgroundImage: `url(${backgroundImg})`,
      padding: 0,
      margin: 0,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
  });