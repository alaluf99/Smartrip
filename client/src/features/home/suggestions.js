import { Button, Grid, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { suggestions } from '../../models/suggestions';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black'
    },
    card: {
        display: 'inline-block', margin: 13, 
    }
});


export default function Suggestions() {
    const classes = useStyles();

    const suggestion = (plan) => {
        return (<Card className={classes.card } item xs={12} md={6} lg={4}>
            <CardActionArea>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {plan.startDate} - {plan.endDate}
                    </Typography>
                    {plan.places.map(place => <h3>{place.city} {place.numberOfDays} days</h3>)}
                    <Button variant="contained" color="secondary">
                        More Info...
</Button>
                </CardContent>
            </CardActionArea>
        </Card>)
    }

    return (
        <div className={classes.root}>
            <h1>Suggestions for you...</h1>
            <Grid container>
                {[...suggestions, ...suggestions].map(s => suggestion(s))}
            </Grid>
        </div>
    );
}