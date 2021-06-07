import DateFnsUtils from "@date-io/date-fns";
import { Button, ButtonGroup, CssBaseline, FormControl, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { serverUrls } from "../../../config/config";
import AddLocationModal from "./add-location-modal";
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    marginBottom: 50
  },
  root: {
    maxWidth: 345,
  },
});

export default function PlanningFormPage(props) {
  const classes = useStyles();

  const { state: search } = props.location;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [locations, setLocations] = useState([]);
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search) {
      try {
        const { startDate, endDate, locations, people } = search;
        if(startDate) {
          setStartDate(startDate)
        }
        if(endDate) {
          setEndDate(endDate)
        }
        if (people) {
          setNumberOfTravelers(people)
        }
        if(locations) {
          setLocations(locations)
        }
      } catch {}

    }
  }, []);

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
    setLocations([...locations, newLocation]);
  }

  const removeLocation = (index) => {
    console.log(index)

    const allLocations = locations;
    allLocations.splice(index, 1);  
    console.log(allLocations)

    setLocations([...allLocations]);
  }
  
  const onSubmit = async (values) => {
    const planData = {
      startDate: getRequestDateFormat(startDate),
      endDate: getRequestDateFormat(endDate),
      people: numberOfTravelers,
      locations
    }

    axios
      .post(serverUrls.plan, planData, { headers: { "numOfResults": 3 } })
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

  const locationsTable = () =>
  (
    <TableContainer key={1} component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">city</TableCell>
            <TableCell align="center">is flexible</TableCell>
            <TableCell align="center">number of days</TableCell>
            <TableCell align="center">start date</TableCell>
            <TableCell align="center">end date</TableCell>
            <TableCell align="center">remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((loc, i) => (
            <TableRow>
              <TableCell align="center">{loc.location}</TableCell>
              <TableCell align="center">{loc.isFlexible ? <DoneIcon></DoneIcon> : <CloseIcon></CloseIcon>}</TableCell>
              <TableCell align="center">{loc.isFlexible ? loc.numberOfDays : '-'}</TableCell>
              <TableCell align="center">{!loc.isFlexible ? getDisplayDateFormat(loc.startDate) : '-'}</TableCell>
              <TableCell align="center">{!loc.isFlexible ? getDisplayDateFormat(loc.endDate) : '-'}</TableCell>
              <TableCell align="center"><IconButton ><RemoveIcon onClick={() => removeLocation(i)}></RemoveIcon></IconButton></TableCell>
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
      <FormControl>
        <Paper style={{ padding: 16 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container alignItems="flex-start" direction="column">
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <h3>Trip dates</h3></Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={5}>
                      <KeyboardDatePicker
                        disableToolbar
                        name="datee"
                        variant="inline"
                        format="yyyy/dd/MM"
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
                    <Grid item xs={2}></Grid>
                    <Grid item xs={5}>
                      <KeyboardDatePicker
                        disableToolbar
                        name="datee"
                        variant="inline"
                        format="yyyy/dd/MM"
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
                </Grid>
                <Grid container item xs={6}>
                  <Grid item xs={12}><h3>Number of travellers</h3></Grid>
                  <Grid item xs={12}>
                    <ButtonGroup
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
                        <Button style={{ backgroundColor: 'transparent' }}>{numberOfTravelers}</Button>
                      )}
                      <Button onClick={() => setNumberOfTravelers(numberOfTravelers + 1)}>
                        +
                    </Button>
                    </ButtonGroup></Grid>

                </Grid>
              </Grid>
              <br></br>
              <Grid container>
                <Grid item xs={12}>
                  <h3>Locations</h3>
                </Grid>
                <Grid container>
                  {
                    locations.length > 0 ?
                      locationsTable(locations) : ''}
                </Grid>
                <Grid container>
                  <AddLocationModal onAddLocation={addLocation}></AddLocationModal>
                </Grid>
              </Grid>
              <br></br>
              <Grid>
                <Grid container>
                  <Grid className="submit" item xs={12}>
                    <Button
                      onClick={onSubmit}
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Submit
                      </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Paper>
      </FormControl>
    </div>
  );
}
