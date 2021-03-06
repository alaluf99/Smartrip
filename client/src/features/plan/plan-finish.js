import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { React } from 'react';
import { plans } from '../../models/plan';
import newYorkImage from './../../images/newYork.jpg';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function FinishPlan() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {plans.map(plan =>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={newYorkImage}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {plan.startDate} - {plan.endDate}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                My trip
                </Typography>
                            <Typography variant="body2" component="p">
                                number of adults: {plan.adultsNumber}
                                <br />
                number of children: {plan.childrenNumber}
                                <br />
    tota price: {plan.totaPrice}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Edit
              </Button>
                        <Button size="small" color="primary">
                            Delete
              </Button>
                    </CardActions>
                </Card>
            )}
        </div>
    );
}