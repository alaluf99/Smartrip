import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { serverUrls } from '../../config/config';
import { suggestionsData } from '../../models/suggestions';
import { Suggestion } from '../suggestion';

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

    const [suggestions, setSuggestions] = useState([...suggestionsData, ...suggestionsData]);
    const [errorLoading, setErrorLoading] = useState(false);

    useEffect(() => {
        axios
          .get(serverUrls.historyUrl)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setSuggestions(JSON.stringify(response.data));
          })
          .catch((err) => {
            setErrorLoading(true);
            console.log(err);
            throw err;
          });
      }, []);

    return (
        <div className={classes.root}>
            <h1>Suggestions for you...</h1>
            <Grid container>
                {suggestions.map(s => Suggestion(s))}
            </Grid>
        </div>
    );
}