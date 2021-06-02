import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    // fontFamily: 'Courier New',
    flexGrow: 1,
  },
}),
);

export default function Menu() {
  const classes = useStyles();
  let isAuthenticated = useSelector(state => state.user.authenticated);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='default'>
        <Toolbar>
          <Button href="/">
            <Typography variant="h4" className={classes.title}>SmartTrip</Typography>
            </Button>
          {isAuthenticated ?
            <>
              <Button color="inherit" href="history">My History</Button>
              <Button color="inherit" href="suggestions">Suggestions</Button>
              <Button color="inherit" href="planning">Planning</Button>
              <Button color="inherit" onClick={() => dispatch(logoutUser())}>Log out</Button>
            </>
            :
            <>
              <Button color="inherit" href="login">Login</Button>
              <Button color="inherit" href="signup">Sign up</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}