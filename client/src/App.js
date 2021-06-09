import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
// Redux
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getUserData, logoutUser } from './actions/userActions';
import "./App.css";
import History from "./features/history/history";
import { Home } from "./features/home/home";
import Login from "./features/login/login";
import PlanDetails from "./features/plan/plan-details/plan-details";
import PlanningFormPage from "./features/plan/planning-form-page/planning-form-page";
import Suggestions from "./features/plan/suggestions";
import SignUp from "./features/sign-up/sign-up";
import Layout from "./hoc/layout/Layout";
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import AuthRoute from './util/AuthRoute';


const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const theme = createMuiTheme({
  typography: {
    fontFamily: "News Cycle, Arial Narrow Bold, sans-serif"
  }
});

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Layout>
            <BrowserRouter>
              <Switch>
                <AuthRoute path="/planning" component={PlanningFormPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <AuthRoute path="/history" component={History} />
                <AuthRoute path="/suggestions" component={Suggestions} />
                <AuthRoute path="/plandetails" component={PlanDetails} />
                <Route exact path="/" component={Home} />
              </Switch>
            </BrowserRouter>
          </Layout>
        </MuiThemeProvider >
      </div>
    </Provider>
  );
}

export default App;
