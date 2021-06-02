import { Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";

export default function AddLocationModal({ isOpen, onAddLocation, close }) {
  const [location, setLocation] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFlexible, setIsFlexible] = useState(true);
  const [numerOfDays, setNumerOfDays] = useState(2);

  const addLocation = () => {
    const newLocation = {
      location,
      startDate,
      endDate,
      isFlexible,
      numerOfDays
    };

    onAddLocation(newLocation)
    setLocation("");
    setIsFlexible(true)
  }
  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <Dialog open={isOpen} fullWidth>
        <DialogTitle>Add location</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="City"
                  name="city"
                  autoFocus
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Checkbox
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
                    margin="normal"
                    label="days number"
                    name="numberOfDays"
                    value={numerOfDays}
                    onChange={e => setNumerOfDays(e.target.value)}/> : ''}
                
              </Grid>
            </Grid>
            {!isFlexible ? <Grid>
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
            </Grid> : ''}
          </Grid>
        </DialogContent>
        <DialogActions><Button color="primary" variant="outlined" onClick={addLocation}>Add</Button>
          <Button variant="outlined" onClick={close} >Cancel</Button></DialogActions>
      </Dialog>
    </div>
  );
}
