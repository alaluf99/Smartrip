import { Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from "react";

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black'
    },
    card: {
        display: 'inline-block', margin: 13,
    }
});

export const Suggestion = (plan) => {
    const classes = useStyles();

    return (<Card className={classes.card} item xs={12} md={6} lg={4}>
        <CardActionArea>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {plan.startDate} - {plan.endDate}
                </Typography>
                {plan.places.map(place => <Typography>{place.city} {place.numberOfDays} days</Typography>)}
                <Button variant="contained" color="secondary">
                    More Info...
</Button>
            </CardContent>
        </CardActionArea>
    </Card>)
}