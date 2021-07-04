import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Checkout from "./components/Cart/Checkout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ManageProduct from "./components/ManageProduct/ManageProduct";
import NoMatch from "./components/NoMatch/NoMatch";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


export const UserContext = createContext();

function App() {
  const [buyProduct, setBuyProduct] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, buyProduct, setBuyProduct]}>
    <Router>
      <Switch>
        <Route path="/home">
          <Home/>
        </Route>
       <Route path="/login">
       <Login/>
       </Route>
       <PrivateRoute path="/checkout">
        <Checkout />
        </PrivateRoute>
       <PrivateRoute path="/admin">
         <Admin/>
       </PrivateRoute>
       <PrivateRoute path="/orders">
        <Orders/>
       </PrivateRoute>
       <PrivateRoute path="/manageProduct">
         <ManageProduct/>
       </PrivateRoute>
       <Route exact path="/">
          <Home/>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
