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
import { ApolloProvider } from "@apollo/client";
import BookingDetails from "./screens/BookingDetails";
import CreateDish from "./screens/CreateDish";
import LoginScreen from "./screens/Login";
import { apolloClient } from "./utils/apolloClient";
import AllOrders from "./screens/AllOrders";
import AllBookings from "./screens/AllBookings";

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <div className='App'>
            <Navbar />
            <Switch>
              <Route exact path='/menu' component={MenuScreen} />
              <Route path='/order' component={OrderScreen} />
              <Route path='/summary/:orderId' component={SummaryScreen} />
              <Route path='/book/:readableId' component={BookingDetails} />
              <Route path='/book' component={TableBook} />
              <Route path='/dishes/add' component={CreateDish} />
              <Route path='/dishes/edit/:id' component={CreateDish} />
              <Route path='/admin/orders' component={AllOrders} />
              <Route path='/admin/bookings' component={AllBookings} />
              <Route path='/admin' component={LoginScreen} />
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
