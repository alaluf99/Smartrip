import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import homeBackgroundImage from './../../images/home-background.jpeg';
import HomeSuggestions from './home-suggestions';

const useStyles = makeStyles((theme) => ({
 
    homeImage: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${homeBackgroundImage})`,
        width: '100%',
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
    root: {
        color: theme.palette.common.white,
        backgroundColor: 'black',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    }
}));

export function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Paper className={classes.homeImage}>
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
                                <Button variant="outlined" className={classes.text} color="inherit" href="planning">start planning</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                {/* <Grid container spacing={2} justify="center" className={{ width: '100%' }}>
                    <HomeSuggestions />
                </Grid> */}
            </Grid>
        </div>
    );
}