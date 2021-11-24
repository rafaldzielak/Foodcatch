import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import "./scss/global.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuScreen from "./screens/MenuScreen";
import { Provider } from "react-redux";
import { store } from "./state/store";
import OrderScreen from "./screens/OrderScreen";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SummaryScreen from "./screens/SummaryScreen";
import TableBook from "./screens/TableBook";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({ uri: "http://localhost:5000/graphql", cache: new InMemoryCache() });

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <div className='App'>
            <Navbar />
            <Switch>
              <Route exact path='/menu' component={MenuScreen} />
              <Route path='/order' component={OrderScreen} />
              <Route path='/summary' component={SummaryScreen} />
              <Route path='/book' component={TableBook} />
              <Route path='/' component={HomeScreen} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
