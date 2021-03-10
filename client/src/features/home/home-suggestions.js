import { Grid, makeStyles } from '@material-ui/core';
import React from "react";
import { suggestions } from '../../models/suggestions';
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

    return (
        <div className={classes.root}>
            <h1>Suggestions for you...</h1>
            <Grid container>
                {[...suggestions, ...suggestions].map(s => Suggestion(s))}
            </Grid>
        </div>
    );
}