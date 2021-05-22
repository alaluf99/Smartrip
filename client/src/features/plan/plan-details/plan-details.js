import { Button, CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import hotelIcon from './../../../images/hotel.png';
import Map from './map';

const useStyles = makeStyles((theme) => (
    {
        root: {
            height: '100vh',

        },
        hotelIcon: {
            width: 30
        },
        menu: {
            padding: theme.spacing(8, 4),
        },
        paper: {
            margin: theme.spacing(8, 4),
            textAlign: "left",
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

    const [plan, setPlan] = useState(plans[0]);
    const [planIndex, setPlanIndex] = useState(0);
    
    const updatePlan = (i) => {
        setPlan(plans[i])
        setPlanIndex(i)
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid component="main" className={classes.menu} item xs={1}>
                {
                    plans.size > 1 ?
                    plans.map((p, i) =>
                        <div>
                            <Grid >
                                <Button onClick={()=>updatePlan(i)} variant="contained" color="secondary">Plan {i + 1}#</Button>
                            </Grid>
                            <br></br>
                        </div>
                    )
                : null}
            </Grid>
            <Grid item xs={5} className={classes.paper} square>
                <div component="main" maxWidth="xs">
                    <div className={classes.root}>
                        <div>
                            <div className={classes.title}>
                                <Typography color="textSecondary" gutterBottom>
                                    {plan.startDate} - {plan.endDate}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Plan suggestion {planIndex + 1}#
                    </Typography>
                            </div>
                            <Typography variant="h6">General info</Typography>

                            <Typography variant="subtitle1">
                                number of adults: {plan.adultsNumber}
                                <br />
                    number of children: {plan.childrenNumber}
                                <br />
        tota price: {plan.totalPrice}$
                            </Typography>
                            <br></br>
                            <Typography variant="h6">Places</Typography>
                            <Grid container
                                justify="space-between"
                                spacing={3}
                            >
                                {plan.sections ? plan.sections.map(section =>
                                    <Grid item
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="stretch"
                                    >
                                        <Rating name="read-only" value={section.accommodation.rating} readOnly />
                                        <img src={hotelIcon} className={classes.hotelIcon}></img>
                                        <Typography>{section.accommodation.accommodationName}</Typography>
                                        <Typography>{section.accommodation.city}</Typography>
                                        <Typography>{section.fromDate} - {section.toDate}</Typography>
                                        <Typography>{section.price}$</Typography>
                                    </Grid>
                                ) : null}
                            </Grid>
                        </div>
                    </div>
                </div>

            </Grid>
            <Grid item xs={5} elevation={6} square>
            { plan.sections ?
                <Map locations={plan.sections.map(l => { return { "location": l.accommodation.location, "name": l.accommodation.accommodationName } })} />
                : null }
            </Grid>
        </Grid>
    );
}