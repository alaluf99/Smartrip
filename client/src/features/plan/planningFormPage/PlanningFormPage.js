import React from "react";
import { Form } from "react-final-form";
import {
  Paper,
  Button,
  CssBaseline,
  ButtonGroup,
  Slider,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "./planning-form-page.css";

export default function PlanningFormPage() {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [numberOfTravelers, setNumberOfTravelers] = React.useState(0);
  const [numberOfRooms, setNumberOfRooms] = React.useState(0);

  const [priceRangeValue, setPriceRangeValue] = React.useState([500, 6000]);

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
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

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: "larry" }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="grid">
                  <h2 className="dates">Trip dates</h2>
                  <div className="cell">
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
                        console.log("blaaaaa");
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      className="date-picker"
                    />
                  </div>

                  <h2>Number of travellers</h2>
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
                      <Button disabled>{numberOfTravelers}</Button>
                    )}
                    <Button
                      onClick={() =>
                        setNumberOfTravelers(numberOfTravelers + 1)
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>

                  <h2>Number of rooms</h2>
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

                  <h2>Price range</h2>
                  <Slider
                    value={priceRangeValue}
                    onChange={(event, newValue) => {
                      setPriceRangeValue(newValue);
                      console.log(priceRangeValue);
                    }}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={(value) => `${value}°C`}
                    min={500}
                    max={10000}
                    marks={marks}
                    className="price-range"
                  />

                  <div className="buttons">
                    <div className="reset">
                      <Button
                        type="button"
                        variant="contained"
                        onClick={reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="submit">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </MuiPickersUtilsProvider>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}

// export default PlanningFormPage;
