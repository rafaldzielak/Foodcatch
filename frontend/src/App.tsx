import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import "./scss/global.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuScreen from "./screens/MenuScreen";
import { Provider } from "react-redux";
import { store } from "./state/store";
import OrderScreen from "./screens/OrderScreen";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/menu' component={MenuScreen} />
            <Route path='/order' component={OrderScreen} />
            <Route path='/' component={HomeScreen} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
