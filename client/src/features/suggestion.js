import { Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'black'
    },
    card: {
        backgroundColor: theme.palette.secondary,
        display: 'inline-block',
        margin: 13,
    },
    content: {
        // color: theme.palette.common.white,
    }
}));

export default function Suggestion(props) {
    const classes = useStyles();

    const history = useHistory();

    const { plan } = props;
  
    const handleMoreInfo = () => {
      history.push({
        pathname: '/plandetails',
        state: [plan]
      });
    }

    const calcNumberOfDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(startDate)
        console.log(endDate)
        console.log(diffDays)
        return diffDays
    }
    return (<Card className={classes.card} item xs={12} md={6} lg={4}>
        <CardActionArea>
            <CardContent >
                <Typography color="textSecondary" gutterBottom>
                    {plan.startDate} - {plan.endDate}
                </Typography>
                {plan.path.map(place => <Typography variant="subtitle1" className={classes.content}>{place.locationName} {calcNumberOfDays(place.checkIn, place.checkOut)} days</Typography>)}
                <br></br>
                <Button variant="contained" color="default" onClick={handleMoreInfo}>
                    More Info
</Button>
            </CardContent>
        </CardActionArea>
    </Card>)
}