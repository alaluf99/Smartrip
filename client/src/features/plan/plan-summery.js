import { Chip, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { React } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles({
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
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
  },
  locations: {
    textAlign: "left",
    marginTop: 10,
    marginBottom: 10
  },
  divider: {
    margin: "3px 0",
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
});

export default function PlanSummery(props) {
  const classes = useStyles();
  const history = useHistory();

  const { plan: search, index } = props;

  const getImage = () => {
    return `https://source.unsplash.com/collection/1075959/1600x900?sig=${index}`;
  }

  const handleContinueSearch = () => {
    history.push({
      pathname: '/planning',
      state: search
    });
  }

  const displayIsFlexiable = (isFlexiable) => {
    return isFlexiable ?
      <Chip variant="outlined" size="small" label="flexiable" color="primary"/> :
      <Chip variant="outlined" size="small" label="not flexible" margin="10" />
  }

  return (
    <Grid item xs={4}>
      <Card key={search.planId} className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={getImage()}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {search.startDate} - {search.endDate}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={classes.content}
            >
              number of poeple: {search.people}
              <br />
              {search.locations.map(location => {
                return <Typography variant="body2"
                  component="p"
                  className={classes.locations}>
                  {location.location} : {location.numberOfDays ? `${location.numberOfDays} days` : ""}  {displayIsFlexiable(location.isFlexible)}
                </Typography>
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider className={classes.divider} light />
        <CardActions>
          <Button size="small" color="secondary" onClick={handleContinueSearch}>
            Continue Searching
              </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
