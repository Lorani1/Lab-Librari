import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import Dashboard from "./dashboard/Dashboard";
import Klienti from "./dashboard/Klienti";
import Libri from "./dashboard/Libri";
import Autori from "./dashboard/Autori";
import Staf from "./dashboard/Staf";
import Cart from "./components/Cart/Cart";
import CartItem from "./components/Cart/CartItem/CartItem";
import AddressForm from "./components/CheckoutForm/AddressForm";
import Qyteti from "./dashboard/Qyteti";
import Profile from "./components/Navbar/Profile";
import Manga from "./components/Manga/Manga";
import Biography from "./components/Bio/Biography";
import Fiction from "./components/Fiction/Fiction";
import Crime from "./components/Crime/Crime";
import Anime from "./components/Anime/Anime";
import ShtepiaBotuese from "./dashboard/ShtepiaBotuese";
import zhanri from "./dashboard/zhanri";
import ProductView from "./components/ProductView/ProductView";
import Product from "./components/Products/Product/Product";
import Products from "./components/Products/Products";
import Ratings from "./dashboard/Ratings";
import Pozita from "./dashboard/pozita";
import ExchangeForm from "./Exchange/ExchangeForm";
import ExchangeList from "./Exchange/ExchangeList";
import ExchangeApprove from "./Exchange/ExchangeApprove";
import apiService from "./Exchange/apiService";
import getNotifications from "./Noitification/getNotifications";
import Notification from "./Noitification/Notification";
import PendingApproval from "./Exchange/PendingApproval";
import Exchange from "./Exchange/Exchange";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/klienti" component={Klienti} />
          <ProtectedRoute path="/autori" component={Autori} />
          <ProtectedRoute path="/pozita" component={Pozita} />
          <ProtectedRoute path="/staf" component={Staf} />
          <ProtectedRoute path="/cart" component={Cart} />
          <ProtectedRoute path="/addressform" component={AddressForm} />
          <ProtectedRoute path="/cartitem" component={CartItem} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/qyteti" component={Qyteti} />
          <ProtectedRoute path="/libri" component={Libri} />
          <ProtectedRoute path="/manga" component={Manga} />
          <ProtectedRoute path="/zhanri" component={zhanri} />
          <ProtectedRoute path="/biography" component={Biography} />
          <ProtectedRoute path="/fiction" component={Fiction} />
          <ProtectedRoute path="/crime" component={Crime} />
          <ProtectedRoute path="/anime" component={Anime} />
          <ProtectedRoute path="/shtepiabotuese" component={ShtepiaBotuese} />
          <ProtectedRoute path="/Product" component={Product} />
          <ProtectedRoute path="/Products" component={Products} />
          <ProtectedRoute path="/ratings" component={Ratings} />
          <ProtectedRoute path="/product-view/:id" component={ProductView} />
          <ProtectedRoute path="/exchangeForm" component={ExchangeForm} />
          <ProtectedRoute path="/exchangeList" component={ExchangeList} />
          <ProtectedRoute path="/exchangeApprove" component={ExchangeApprove} />
          <ProtectedRoute path="/getNotifications" component={getNotifications} />
          <ProtectedRoute path="/Notificationss" component={Notification} />
          <ProtectedRoute path="/Exchange" component={Exchange} />
          <ProtectedRoute path="/PendingApproval" component={PendingApproval} />
          <ProtectedRoute path="/apiService" component={apiService} />

          <Route path="/registration" component={Registration} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
