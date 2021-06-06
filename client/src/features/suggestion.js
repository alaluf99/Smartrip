import { Button, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { useHistory } from 'react-router';
import chain from "lodash";
import sumBy from "lodash";

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
        return diffDays
    }

    const getDaysNum = (list) => {
        if (list) {
            console.log(list)
            let sum = 0;
            list.forEach(l => {
                sum += l.days
            });
            return sum;
        }

    }

    const data = plan.path.map(place => { return { name: place.locationName, days: calcNumberOfDays(place.checkIn, place.checkOut) } })

    var result = [];
    data.reduce(function (res, value) {
        if (!res[value.name]) {
            res[value.name] = { name: value.name, days: 0 };
            result.push(res[value.name])
        }
        res[value.name].days += value.days;
        return res;
    }, {});

    return (<Card className={classes.card} item xs={12} md={6} lg={4}>
        <CardActionArea>
            <CardContent >
                <Typography color="textSecondary" gutterBottom>
                    {plan.startDate} - {plan.endDate}
                </Typography>
                {result.map(place => <Typography variant="subtitle1" className={classes.content}>{place.name} {place.days} days</Typography>)}
                <br></br>
                <Button variant="contained" color="default" onClick={handleMoreInfo}>
                    More Info
</Button>
            </CardContent>
        </CardActionArea>
    </Card>)
}