import { Button, Checkbox, Grid, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import Select from 'react-select';

const cities = [{ value: "Tel Aviv", label: "Tel Aviv" },
{ value: "Haifa", label: "Haifa" },
{ value: "Kiryat Ono", label: "Kiryat Ono" }];

export default function AddLocationModal({ onAddLocation }) {
  const [location, setLocation] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFlexible, setIsFlexible] = useState(true);
  const [numberOfDays, setNumberOfDays] = useState(2);

  const setLoc = (e) => {
    if(e) {
      setLocation(e.value)
    }
  }

  const getRequestDateFormat = (date) => {
    if (date) {
      var date1 = new Date(date)
      var day = date1.getDay();
      var month = date1.getMonth();
      var fullDay = day > 9 ? day : "0" + day.toString()
      var fullMonth = month > 9 ? month : "0" + month.toString()
      return date1.getFullYear() + "-" + fullDay + "-" + fullMonth
    }
    return ""
  }

  const addLocation = () => {
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

    onAddLocation(newLocation)
    setLocation("");
    setIsFlexible(true)
    setNumberOfDays(2);
  }

  return (
      <Grid container>
        <Grid item xs={4}>
          <Select
            className="basic-single"
            classNamePrefix="select"
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
            onChange={e => setIsFlexible(e.target.checked)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />Is flexible
              </Grid>
        <Grid item xs={3}>
          {isFlexible ?
            <TextField
              type="number"
              variant="outlined"
              label="days number"
              name="numberOfDays"
              value={numberOfDays}
              onChange={e => setNumberOfDays(e.target.value)} /> :         <Grid>
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
            </Grid>}
        </Grid>
        <Grid item xs={2}> <Button color="primary" variant="outlined" onClick={addLocation}>Add</Button></Grid>
      </Grid>
  );
}
