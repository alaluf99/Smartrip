import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      fontFamily: 'Courier New',
      flexGrow: 1,
    },
  }),
);

export default function Menu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='default'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Button edge="start"   href="/">
            <Typography variant="h4" className={classes.title}>SmartTrip</Typography></Button>
          <Button color="inherit" href="history">My History</Button>
          <Button color="inherit" href="login">Login</Button>
          <Button color="inherit"href="signup">Sign up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}