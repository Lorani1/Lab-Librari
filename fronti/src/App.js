import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import Dashboard from "./dashboard/Dashboard";
import Klienti from "./dashboard/Klienti";
import Libri from "./dashboard/Libri";
import Autori from "./dashboard/Autori";
import Staf from "./dashboard/Staf";



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Registration" component={Registration} />
        <Route path="/Login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/klienti" component={Klienti} />
        <Route path="/libri" component={Libri} />
        <Route path="/autori" component={Autori} />
        <Route path="/staf" component={Staf} />
      </Switch>
    </Router>
  );
}

export default App;
