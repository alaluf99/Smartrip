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

  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [locations, setLocations] = useState([]);
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [error, setError] = useState(null);
  const [priceRangeValue, setPriceRangeValue] = useState([500, 6000]);

  const history = useHistory();
  
  const getDisplayDateFormat = (date) => {
    if (date) {
      return date.toLocaleString().split(',')[0]
    }
    return ""
  }

  const getRequestDateFormat = (date) => {
    if (date) {
      var date1= new Date(date)
      var day = date1.getDay();
      var month = date1.getMonth();
      var fullDay = day > 9 ? day : "0" + day.toString()
      var fullMonth = month > 9 ? month : "0" + month.toString()
      return date1.getFullYear() + "-" + fullDay + "-" + fullMonth
    }
    return ""
  }

  const addLocation = (newLocation) => {
    const updatedLocations = locations;
    updatedLocations.push(newLocation);
    setLocations(updatedLocations);
    setIsAddLocationOpen(false);
  }

  const onSubmit = async (values) => {
    const planData = {
      startDate: getRequestDateFormat(startDate),
      endDate: getRequestDateFormat(endDate),
      people: numberOfTravelers,
      locations
    }

    console.log(planData);

    axios
      .post(serverUrls.plan, planData)
      .then((response) => {
        console.log(response.data.data);
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

  const marks = [
    {
      value: 500,
      label: "500$",
    },
    {
      value: 3000,
      label: "3000$",
    },
    {
      value: 6000,
      label: "6000$",
    },
    {
      value: 10000,
      label: "10000$",
    },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    return errors;
  };

  const displayTravelersCounter = numberOfTravelers > 0;
  const displayRoomsCounter = numberOfRooms > 0;

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
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      {error}
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: "larry" }}
        validate={validate}
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
                  <Grid container item xs={12}>
                    <Grid item xs={4}>
                      <h3>Number of rooms</h3>
                    </Grid>
                    <Grid item xs={8}>
                      <ButtonGroup
                        className="rooms"
                        size="small"
                        aria-label="small outlined button group"
                      >
                        {displayRoomsCounter && (
                          <Button
                            onClick={() => setNumberOfRooms(numberOfRooms - 1)}
                          >
                            -
                          </Button>
                        )}

                        {displayRoomsCounter && (
                          <Button disabled>{numberOfRooms}</Button>
                        )}
                        <Button onClick={() => setNumberOfRooms(numberOfRooms + 1)}>
                          +
                    </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={4}>
                      <h3>Price range</h3>
                    </Grid>
                    <Grid item xs={7}>
                      <Slider
                        value={priceRangeValue}
                        onChange={(event, newValue) => {
                          setPriceRangeValue(newValue);
                        }}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={(value) => `${value}°C`}
                        min={500}
                        max={10000}
                        marks={marks}
                        className="price-range"
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid container>
                      <h3>Locations</h3>
                      <Button size="small" variant="contained" onClick={() => setIsAddLocationOpen(true)} className={{margin: 100}}>Add</Button>
                    </Grid>
                    <Grid container>
                      {
                        locations.length > 0 ?
                          locationsTable(locations) : ''}
                    </Grid>
                    <AddLocationModal close={() => setIsAddLocationOpen(false)} isOpen={isAddLocationOpen} onAddLocation={addLocation}></AddLocationModal>
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
