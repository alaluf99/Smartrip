import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { suggestions } from '../../models/suggestions';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


export default function Suggestions() {
    const classes = useStyles();

    const suggestion = (plan) => {
        return (<Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {plan.startDate} - {plan.endDate}
                    </Typography>
                    {plan.places.map(place => <h3>{place.city} {place.numberOfDays} days</h3>)}
                </CardContent>
            </CardActionArea>
        </Card>)
    }

  return (

        <div>
            <h1>Suggestions for you...</h1>
            {suggestions.map(s => suggestion(s))}
        </div>
    );
}