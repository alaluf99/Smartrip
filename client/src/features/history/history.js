import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { getHeaders } from "../../actions/userActions";
import axios from "../../axios-smartTrip";
import { serverUrls } from "../../config/config";
import Error from "../../pages/errorPage/ErrorPage";
import LoadingPage from "../../pages/loadingPage/LoadingPage";
import PlanSummery from "../plan/plan-summery";

const useStyles = makeStyles((theme) => ({}));

export default function History() {
  const classes = useStyles();

  const [plansHistory, setPlansHistory] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    axios
      .get(serverUrls.history, { headers: getHeaders() })
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
        <Container>
          <h1>My History</h1>
          {
            plansHistory.map((plan) => { return <PlanSummery plan={plan} /> })
          }
        </Container>
      </div>
    );
  }

  return toReturn;
}
