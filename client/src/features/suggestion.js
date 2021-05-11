import { Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from "react";
import Color from 'color';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'black'
    },
    card: {
        backgroundColor:theme.palette.secondary,
        display: 'inline-block', 
        margin: 13,
    },
    content: {
        // color: theme.palette.common.white,
    }
}));

export const Suggestion = (plan) => {
    const classes = useStyles();

    return (<Card className={classes.card} item xs={12} md={6} lg={4}>
        <CardActionArea>
            <CardContent >
                <Typography color="textSecondary" gutterBottom>
                    {plan.startDate} - {plan.endDate}
                </Typography>
                {plan.places.map(place => <Typography variant="subtitle1" className={classes.content}>{place.city} {place.numberOfDays} days</Typography>)}
                <br></br>
                <Button variant="contained" color="default">
                    More Info
</Button>
            </CardContent>
        </CardActionArea>
    </Card>)
}