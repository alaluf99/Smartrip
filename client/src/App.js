import { ThemeProvider } from '@material-ui/core/styles';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import History from "./features/history/history";
import { Home } from "./features/home/home";
import Login from "./features/login/login";
import PlanDetails from "./features/plan/plan-details/plan-details";
import PlanningFormPage from "./features/plan/planning-form-page/planning-form-page";
import Suggestions from "./features/plan/suggestions";
import SignUp from "./features/sign-up/sign-up";
import Layout from "./hoc/layout/Layout";

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
              <Route path="/suggestions" component={Suggestions} />
              <Route path="/plandetails" component={PlanDetails} />
              <Route exact path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </Layout>
      </ThemeProvider>



    </div>
  );
}

export default App;
