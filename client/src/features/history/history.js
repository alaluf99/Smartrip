import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { getHeaders } from "../../actions/userActions";
import axios from "../../axios-smartTrip";
import { serverUrls } from "../../config/config";
import Error from "../../pages/errorPage/ErrorPage";
import LoadingPage from "../../pages/loadingPage/LoadingPage";
import PlanSummery from "../plan/plan-summery";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({}));

export default function History() {
  const classes = useStyles();

  const [plansHistory, setPlansHistory] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);

  const headers = {
    'Authorization': localStorage.FBIdToken
  }
  useEffect(() => {
    axios
      .get(serverUrls.history, {headers})
      .then((response) => {
        setPlansHistory(response.data.data);
      })
      .catch((err) => {
        setErrorLoading(true);
        console.log(err);
        throw err;
      });
  }, []);

  var toReturn = errorLoading ? <Error /> : <LoadingPage />;

  if (plansHistory) {
    toReturn = (
      <div>
        <h1>My Search History</h1>
        <br/>
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
          {
            plansHistory.map((plan, i) => { return <PlanSummery index={i} plan={plan} /> })
          }
        </Grid>
      </div>
    );
  }

  return toReturn;
}
