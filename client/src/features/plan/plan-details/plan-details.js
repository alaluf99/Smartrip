import { CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { plans } from '../../../models/plan';
import hotelIcon from './../../../images/hotel.png';
import MyMap from './map';

const useStyles = makeStyles((theme) => (
    {
        root: {
            height: '100vh',
            maxWidth: '199%'

        },
        hotelIcon: {
            width: 30
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

export default function PlanDetails() {
    const classes = useStyles();
    const plan = plans[0]
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6} className={classes.paper} square>
                <div component="main" maxWidth="xs">
                    <div className={classes.root}>
                        <div>
                            <div className={classes.title}>
                                <Typography color="textSecondary" gutterBottom>
                                    {plan.startDate} - {plan.endDate}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    My trip
                    </Typography>
                            </div>
                            <Typography variant="h6">General info</Typography>

                            <Typography variant="subtitle1">
                                number of adults: {plan.adultsNumber}
                                <br />
                    number of children: {plan.childrenNumber}
                                <br />
        tota price: {plan.totaPrice}$
                            </Typography>
                            <br></br>
                            <Typography variant="h6">Places</Typography>
                            <Grid container
                                justify="space-between"
                                spacing={3}
                            >
                                {plan.sections.map(section =>
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
                                )}
                            </Grid>
                        </div>
                    </div>
                </div>

            </Grid>
            <Grid item xs={12} sm={8} md={5} elevation={6} square>
                <MyMap />
            </Grid>
        </Grid>
    );
}