import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { getHeaders } from '../../actions/userActions';
import { serverUrls } from '../../config/config';
import Suggestion from '../suggestion';
import Error from "../../pages/errorPage/ErrorPage";
import LoadingPage from "../../pages/loadingPage/LoadingPage";

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black'
    },
    card: {
        display: 'inline-block', margin: 13,
    }
});

export default function HomeSuggestions() {
    const classes = useStyles();

    const [suggestions, setSuggestions] = useState(null);
    const [errorLoading, setErrorLoading] = useState(false);

    useEffect(() => {
        axios
          .get(serverUrls.suggestions, {headers: {"numberOfSuggestions": 2}})
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

  var error = errorLoading ? <Error /> : <LoadingPage />;

    return (
        <div className={classes.root}>
            <h1>Suggestions for you...</h1>
            {
                suggestions ? <Grid container>
                    {suggestions.map(sug => <Suggestion plan={sug[0]}></Suggestion>)}
                </Grid> : error}
        </div>
    );
}