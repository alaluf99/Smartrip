import React from "react";
import "./App.css";
import { Home } from "./features/home/home";
import Layout from "./hoc/layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PlanningFormPage from "./features/plan/planningFormPage/PlanningFormPage";

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path="/planning" component={PlanningFormPage} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
