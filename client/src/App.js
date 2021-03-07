import React from "react";
import "./App.css";
import { Home } from "./features/home/home";
import Layout from "./hoc/layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PlanningFormPage from "./features/plan/planningFormPage/PlanningFormPage";
import Login from "./features/login/login";
import SignUp from "./features/sign-up/sign-up";
import History from "./features/history/history";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {

  return (
    <div className="App">
      <ThemeProvider>
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route path="/planning" component={PlanningFormPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/history" component={History} />
              <Route exact path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </Layout>
      </ThemeProvider>



    </div>
  );
}

export default App;
