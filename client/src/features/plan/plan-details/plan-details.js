import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import hotelIcon from './../../../images/hotel.png';
import Map from './map';
import Error from "../../../pages/errorPage/ErrorPage";

const useStyles = makeStyles((theme) => (
    {
        root: {
            height: '100vh',
        },
        hotelIcon: {
            width: 30
        },
        paper: {
            margin: theme.spacing(8, 4),
            textAlign: "left",
        },
        menu: {
            padding: theme.spacing(2, 4),
        },
        title: {
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
        },
        placeInfo: {
            flexDirection: 'row',
        }
    }))

export default function PlanDetails(props) {
    const classes = useStyles();
    const { state } = props.location;
    const plans = state;
    const [planIndex, setPlanIndex] = useState(0);

    const updatePlan = (i) => {
        setPlan(plans[i])
        setPlanIndex(i)
    }

    const getRating = (section) => {
        let rate = 3;
        const { star, score } = section;
        if (star) {
            rate = star;
        } else if (score) {
            rate = score % 2;
        }
        return rate;
    }
    const [plan, setPlan] = useState(plans[0]);

    const getIndex = () => {
        return plans.length > 1 ? planIndex + 1 + "#" : ""
    }

    return (
        <>{plans.length > 0 ?
            <Grid container component="main" className={classes.root}>
                <Grid container item xs={6} justify="center" className={classes.paper} square>
                    {
                        plans.length > 1 ?
                            plans.map((p, i) =>
                                <Grid className={classes.menu}>
                                    <div>
                                        <Grid item>
                                            <Button onClick={() => updatePlan(i)} variant="contained" color="secondary">Plan {i + 1}#</Button>
                                        </Grid>
                                        <br></br>
                                    </div>
                                </Grid>
                            ) : null}
                    <div component="main" maxWidth="xs">
                        <div className={classes.root}>
                            <div>
                                <div className={classes.title}>
                                    <Typography color="textSecondary" gutterBottom>
                                        {plan.startDate} - {plan.endDate}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Plan suggestion {getIndex()}
                                    </Typography>
                                </div>
                                <Typography variant="h6">General info</Typography>

                                <Typography variant="subtitle1">
                                    Total price: {plan.totalPrice}$
                            </Typography>
                                <br></br>
                                <Grid container
                                    justify="space-between"
                                    spacing={3}
                                >
                                    <Grid item
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="stretch"
                                    >
                                        <Grid item xs={2}>rate</Grid>
                                        <Grid item xs={1}>link</Grid>
                                        <Grid item xs={2}><Typography>hotel</Typography></Grid>
                                        <Grid item xs={2}><Typography>city</Typography></Grid>
                                        <Grid item xs={2}><Typography>check in</Typography></Grid>
                                        <Grid item xs={2}><Typography>check out</Typography></Grid>
                                        <Grid item xs={1}><Typography>price</Typography></Grid>
                                    </Grid>
                                    {plan.path ? plan.path.map(section =>
                                        <Grid item
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="stretch"
                                        >
                                            <Grid item xs={2}><Rating size="small" name="read-only" value={getRating(section)} readOnly precision={0.5} /></Grid>
                                            <Grid item xs={1}>
                                                <a href={"//www.booking.com//" + section.link} target="_blank"><img src={hotelIcon} className={classes.hotelIcon}></img></a>
                                            </Grid>
                                            <Grid item xs={2}><Typography>{section.name}</Typography></Grid>
                                            <Grid item xs={2}><Typography>{section.locationName}</Typography></Grid>
                                            <Grid item xs={2}><Typography>{section.checkIn}</Typography></Grid>
                                            <Grid item xs={2}><Typography>{section.checkOut}</Typography></Grid>
                                            <Grid item xs={1}><Typography>{section.price}$</Typography></Grid>
                                        </Grid>
                                    ) : null}
                                </Grid>
                            </div>
                        </div>
                    </div>

                </Grid>
                <Grid item xs={5} elevation={6} square>
                    {plan.path ?
                        <Map locations={plan.path.map(l => { return { "location": { long: l.long, lang: l.lang }, "name": l.name, "city": l.locationName } })} />
                        : null}
                </Grid>
            </Grid>
            : <Error message={"An error occurred while calculating your trip"}></Error>
        }
        </>);
}