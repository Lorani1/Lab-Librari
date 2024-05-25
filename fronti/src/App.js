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
import Manga from "./components/Manga/Manga";
import Biography from "./components/Bio/Biography";
import Fiction from "./components/Fiction/Fiction";
import Crime from "./components/Crime/Crime";
import Anime from "./components/Anime/Anime";
import ShtepiaBotuese from "./dashboard/ShtepiaBotuese";
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
        <Route path="/manga" component={Manga} />
        <Route path="/biography" component={Biography} />
        <Route path="/fiction" component={Fiction} />
        <Route path="/crime" component={Crime} />
        <Route path="/anime" component={Anime} />
        <Route path="/shtepiabotuese" component={ShtepiaBotuese} />
      </Switch>
    </Router>
  );
}

export default App;
