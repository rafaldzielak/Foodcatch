import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AllBookings from "./screens/AllBookings";
import AllCoupons from "./screens/AllCoupons";
import AllOrders from "./screens/AllOrders";
import BookingDetails from "./screens/BookingDetails";
import CreateDish from "./screens/CreateDish";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Login";
import MenuScreen from "./screens/MenuScreen";
import OrderScreen from "./screens/OrderScreen";
import SummaryScreen from "./screens/SummaryScreen";
import TableBook from "./screens/TableBook";
import "./scss/global.scss";
import { store } from "./state/store";
import { apolloClient } from "./utils/apolloClient";

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Helmet>
          <title>FoodCatch | Order Best Food</title>
        </Helmet>
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
                <Route path='/admin/coupons' component={AllCoupons} />
                <Route path='/admin' component={LoginScreen} />
                <Route path='/' component={HomeScreen} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </ApolloProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
