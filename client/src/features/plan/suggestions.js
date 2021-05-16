import { Avatar, Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from "react";
import { suggestionsData } from '../../models/suggestions';
import { Suggestion } from '../suggestion';

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

    return (
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
                        {[...suggestionsData, ...suggestionsData].map((s) => (
                            <Grid key={s} item>
                                { Suggestion(s)}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}