import React from "react";
import { useHistory } from "react-router-dom";
import ProductList from "./component/HomePage/ProductList";
import OrderAdmin from "./component/OrderAdmin"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Infor from "./component/Infor";
import Cart from "./component/Cart";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./component/Login";
import AddItem from "./component/pages/AddItem"
import EditItem from "./component/pages/EditItem"
import ManagerItem from "./pages/ManagerItem"
import Admin from "./pages/Admin"
import ProtectedRoute from "./component/ProtectedRoute";
import Search from './component/HomePage/Search'

export default function App() {
  return (
    <div className="container-fluid">

      <Header />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/cart" exact component={Cart} />
						<ProtectedRoute exact path='/OrderAdmin' exact component={OrderAdmin} />
            {/* <Route path="/OrderAdmin" exact component={OrderAdmin} /> */}
						<ProtectedRoute exact path='/Admin' exact component={Admin} />
            {/* <Route path="/Admin" exact component={Admin} /> */}
            <Route path="/Infor" exact component={Infor} />
						<ProtectedRoute exact path='/AddItem' exact component={AddItem} />
            {/* <Route path="/AddItem" exact component={AddItem} /> */}
						<ProtectedRoute exact path='/ManagerItem' exact component={ManagerItem} />
            {/* <Route path="/ManagerItem" exact component={ManagerItem} /> */}
						<ProtectedRoute exact path='/EditItem' exact component={EditItem} />
            {/* <Route path="/EditItem" exact component={EditItem} /> */}
            <Route path="/" exact component={ProductList} />
            <Route path="/search" exact component={Search} />
          </Switch>
      <Footer />
    </div>
  );
}
