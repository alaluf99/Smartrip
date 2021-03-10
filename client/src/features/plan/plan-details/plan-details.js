import { Container, CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { plans } from '../../../models/plan';
import MyMap from './map';
import hotelIcon from './../../../images/hotel.png'

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
                <Container component="main" maxWidth="xs">
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
        tota price: {plan.totaPrice}
                            </Typography>
                            <br></br>
                            <Typography variant="h6">Places</Typography>
                            {plan.sections.map(section =>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="stretch"
                                >
                                    <img src={hotelIcon} className={classes.hotelIcon}></img>
                                    <Typography>{section.accommodation.accommodationName}</Typography>
                                    <Typography>{section.accommodation.city}</Typography>
                                    <Typography>{section.fromDate} - {section.toDate}</Typography>
                                    <Typography>{section.price}</Typography>
                                </Grid>
                            )}
                        </div>
                    </div>
                </Container>

            </Grid>
            <Grid item xs={12} sm={8} md={5} elevation={6} square>
                <MyMap />
            </Grid>
        </Grid>
    );
}