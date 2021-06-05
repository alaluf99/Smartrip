import { Avatar, Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { getHeaders } from '../../actions/userActions';
import { serverUrls } from '../../config/config';
import Error from "../../pages/errorPage/ErrorPage";
import LoadingPage from '../../pages/loadingPage/LoadingPage';
import Suggestion from '../suggestion';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        display: 'inline-block', margin: 13,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
}));

export default function Suggestions() {
    const classes = useStyles();

  const [suggestions, setSuggestions] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);

    useEffect(() => {
        axios
          .get(serverUrls.suggestions)
          .then((response) => {
            console.log(response.data.data);
            setSuggestions(response.data.data);
          })
          .catch((err) => {
            setErrorLoading(true);
            console.log(err);
            throw err;
          });
      }, []);

      var toReturn = errorLoading ? <Error /> : <LoadingPage />;

      if (suggestions) {
        toReturn = (

            <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Suggestions for you...
        </Typography>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={3}>
                        {suggestions.map((s) => (
                            <Grid key={s} item>
                                { <Suggestion plan={s[0]}></Suggestion>}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
        );
      }
    
      return toReturn;
}