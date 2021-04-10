import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import PlanSummery from "../plan/plan-summery";
import axios from "../../axios-smartTrip";
import serverEndPoints from "../../config/serverEndPoints";
import Error from "../../pages/errorPage/ErrorPage";
import LoadingPage from "../../pages/loadingPage/LoadingPage";

const useStyles = makeStyles((theme) => ({}));

export default function History() {
  const classes = useStyles();

  const [plansHistory, setPlansHistory] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    axios
      .get(serverEndPoints.plansHistory)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setPlansHistory(response.data);
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
        <Container>
          <h1>My History</h1>
          <PlanSummery plans={plansHistory} />
        </Container>
      </div>
    );
  }

  return toReturn;
}
