import { Button, Checkbox, Grid, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import Select from "react-select";

const citiesList = [
  "Dubai",
  "London",
  "Amsterdam",
  "Sydney",
  "Dublin",
  "Singapore",
  "Milan",
  "Rotterdam",
  "Las Vegas",
  "Miami",
  "Quebec City",
  "Geneva",
  "Prague",
  "Nice",
  "Nairobi",
  "Tel Aviv",
  "Hamburg",
  "Venice",
  "Paphos City",
  "Cairo",
  "Athens",
  "Jaipur",
  "Munich",
  "Manchester",
  "Liverpool",
  "Toronto",
  "Vancouver",
  "Tokyo",
  "Seoul",
  "Rome",
  "Bucharest",
  "Budapest",
];
const cities = citiesList.map((c) => {
  return { value: c, label: c };
});

export default function AddLocationModal({ onAddLocation }) {
  const [location, setLocation] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFlexible, setIsFlexible] = useState(true);
  const [numberOfDays, setNumberOfDays] = useState(2);

  const setLoc = (e) => {
    if (e) {
      setLocation(e.value);
    }
  };

  const getRequestDateFormat = (date) => {
    if (date) {
      var date1 = new Date(date);
      var day = ("0" + date1.getDate()).slice(-2);
      var month = ("0" + (date1.getMonth() + 1)).slice(-2);
      return date1.getFullYear() + "-" + month + "-" + day;
    }
    return "";
  };

  const addLocation = () => {
    if(location) {
      const newLocation = {
        location,
        isFlexible,
      };
  
      if (isFlexible) {
        newLocation.numberOfDays = numberOfDays;
      } else {
        newLocation.startDate = getRequestDateFormat(startDate);
        newLocation.endDate = getRequestDateFormat(endDate);
      }
  
      onAddLocation(newLocation);
      setLocation("");
      setIsFlexible(true);
      setNumberOfDays(2);
    }
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue=""
          isClearable={true}
          isSearchable={true}
          name="city"
          options={cities}
          onChange={setLoc}
        />
      </Grid>
      <Grid item xs={3}>
        <Checkbox
          color={"primary"}
          checked={isFlexible}
          onChange={(e) => setIsFlexible(e.target.checked)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        Is flexible
      </Grid>
      <Grid item xs={3}>
        {isFlexible ? (
          <TextField
            type="number"
            variant="outlined"
            label="days number"
            name="numberOfDays"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        ) : (
          <Grid>
            <KeyboardDatePicker
              disableToolbar
              name="datee"
              variant="inline"
              format="MM/dd/yyyy"
              id="travel start date"
              label="travel start date"
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              className="date-picker"
            />

            <KeyboardDatePicker
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
        )}
      </Grid>
      <Grid item xs={2}>
        {" "}
        <Button color="primary" variant="outlined" onClick={addLocation}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
