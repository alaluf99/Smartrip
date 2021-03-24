import { Divider } from '@material-ui/core';
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

const useStyles = makeStyles(
    {
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
        card: {
            maxWidth: 300,
            margin: "auto",
            transition: "0.3s",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            "&:hover": {
                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
            }
        },
        media: {
            paddingTop: "56.25%"
        },
        content: {
            textAlign: "left",
        },
        divider: {
            margin: '3px 0'
        },
        heading: {
            fontWeight: "bold"
        },
        subheading: {
            lineHeight: 1.8
        }
    });

export default function PlanSummery() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {plans.map(plan =>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={newYorkImage}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {plan.startDate} - {plan.endDate}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                My trip
                </Typography>
                            <Typography variant="body2" component="p"  className={classes.content}>
                                number of adults: {plan.adultsNumber}
                                <br />
                number of children: {plan.childrenNumber}
                                <br />
    total price: {plan.totalPrice}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Divider className={classes.divider} light />
                    <CardActions>
                        <Button size="small" color="primary">
                            More info
              </Button>
                    </CardActions>
                </Card>
            )}
        </div>
    );
}