import DateFnsUtils from "@date-io/date-fns";
import { Button, ButtonGroup, Checkbox, CssBaseline, Grid, makeStyles, Paper, Slider, TableRow, TableContainer, TableHead, Table, TableBody, TableCell } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { useHistory } from "react-router";
import { serverUrls } from "../../../config/config";
import AddLocationModal from "./add-location-modal";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PlanningFormPage() {
  const classes = useStyles();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [locations, setLocations] = useState([]);
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [error, setError] = useState(null);

  const history = useHistory();

  const getDisplayDateFormat = (date) => {
    if (date) {
      return date.toLocaleString().split(',')[0]
    }
    return ""
  }

  const getRequestDateFormat = (date) => {
    if (date) {
      var date1 = new Date(date)
      var day = ("0" + date1.getDate()).slice(-2)
      var month = ("0" + (date1.getMonth() + 1)).slice(-2)
      return date1.getFullYear() + "-" + month + "-" + day
    }
    return ""
  }

  const addLocation = (newLocation) => {
    console.log(newLocation)
    setLocations([...locations, newLocation]);
  }

  const onSubmit = async (values) => {
    const planData = {
      startDate: getRequestDateFormat(startDate),
      endDate: getRequestDateFormat(endDate),
      people: numberOfTravelers,
      locations
    }

    axios
      .post(serverUrls.plan, planData)
      .then((response) => {
        const plans = response.data.data;

        history.push({
          pathname: '/plandetails',
          state: plans
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err)
        throw err;
      });
  };

  const displayTravelersCounter = numberOfTravelers > 0;

  const locationsTable = (locations) =>
  (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">city</TableCell>
            <TableCell align="right">is flexible</TableCell>
            <TableCell align="right">number of days</TableCell>
            <TableCell align="right">start date</TableCell>
            <TableCell align="right">end date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((loc) => (
            <TableRow>
              <TableCell align="right">{loc.location}</TableCell>
              <TableCell align="right">{loc.isFlexible ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}</TableCell>
              <TableCell align="right">{loc.isFlexible ? loc.numberOfDays : '-'}</TableCell>
              <TableCell align="right">{!loc.isFlexible ? getDisplayDateFormat(loc.startDate) : '-'}</TableCell>
              <TableCell align="right">{!loc.isFlexible ? getDisplayDateFormat(loc.endDate) : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <CssBaseline />
      {error}
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: "larry" }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid alignItems="flex-start" direction="column">
                  <Grid container item xs={12}>
                    <Grid item xs={4}><h3>Trip dates</h3></Grid>
                    <Grid item xs={4}>
                      <KeyboardDatePicker
                        disableToolbar
                        name="datee"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="travel start date"
                        label="travel start date"
                        value={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          console.log("blaaaaa");
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        className="date-picker"
                      /></Grid>
                    <Grid item xs={4}> <KeyboardDatePicker
                      disableToolbar
                      name="datee"
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="travel end date"
                      label="travel end date"
                      value={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      className="date-picker"
                    />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={4}><h3>Number of travellers</h3></Grid>
                    <Grid item xs={8}>          <ButtonGroup
                      size="small"
                      className="travelers"
                      aria-label="small outlined button group"
                    >
                      {displayTravelersCounter && (
                        <Button
                          onClick={() =>
                            setNumberOfTravelers(numberOfTravelers - 1)
                          }
                        >
                          -
                        </Button>
                      )}
                      {displayTravelersCounter && (
                        <Button disabled>{numberOfTravelers}</Button>
                      )}
                      <Button onClick={() => setNumberOfTravelers(numberOfTravelers + 1)}>
                        +
                    </Button>
                    </ButtonGroup></Grid>

                  </Grid>
                  <Grid container>
                    <Grid container>
                      <h3>Locations</h3>
                    </Grid>
                    <Grid container>
                      {
                        locations.length > 0 ?
                          locationsTable(locations) : ''}
                    </Grid>
                    <Grid container>
                      <br></br>
                      <AddLocationModal onAddLocation={addLocation}></AddLocationModal>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid>
                    <Grid container>
                      <Grid className="submit">
                        <Button
                          onClick={onSubmit}
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                        >
                          Submit
                      </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}
