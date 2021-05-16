import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import PlanSummery from "../plan/plan-summery";
import axios from "../../axios-smartTrip";
import Error from "../../pages/errorPage/ErrorPage";
import LoadingPage from "../../pages/loadingPage/LoadingPage";
import config, { serverUrls } from "../../config/config";
import { getHeaders, getUserToken } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({}));

export default function History() {
  const classes = useStyles();

  const [plansHistory, setPlansHistory] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    axios
      .get(serverUrls.history, {headers: getHeaders()})
      .then((response) => {
        console.log(response.data.data);
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
          <PlanSummery plans={plansHistory} />
        </Container>
      </div>
    );
  }

  return toReturn;
}
