import React, { createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Menu from './menu';
import homeBackgroundImage from './../../images/home-background.jpeg';
import Button from '@material-ui/core/Button';
import FinishPlan from '../plan/plan-finish';

const useStyles = makeStyles((theme) => ({
    text: {
        fontFamily: 'Courier New'
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 600
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

export function Home() {
    const classes = useStyles();
    const ref = createRef();

    return (
        <div>
            <Menu></Menu>
            <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${homeBackgroundImage})` }}>
                {<img style={{ display: 'none' }} src={homeBackgroundImage} />}
                <div className={classes.overlay} />
                <Grid container>
                    <Grid item md={12}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography className={classes.text} component="h1" variant="h3" color="inherit" gutterBottom>
                                SmartTrip
            </Typography>
                            <Typography variant="h5" className={classes.text} color="inherit" paragraph>
                                Plan vacation in five minutes
            </Typography>
                            <Button variant="outlined" className={classes.text} color="inherit" href="#finishPlan">
                                start planning
</Button>


                        </div>
                    </Grid>
                </Grid>
            </Paper>
            <FinishPlan />
        </div>
    );
}