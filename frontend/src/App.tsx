import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import "./scss/global.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuScreen from "./screens/MenuScreen";

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/menu' component={MenuScreen} />
          <Route path='/' component={HomeScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
