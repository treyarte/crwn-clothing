import React, {Component} from 'react';

import './App.css';
import HomePage from "./pages/homepage.component";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-and-sign-up.component";
import Checkout from "./pages/checkout/checkout.component";
import {checkUserSession} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector";
import {createStructuredSelector} from "reselect";

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route   path="/shop" component={ShopPage} />
          <Route  exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUpPage/>)} />
          <Route exact path="/checkout" component={Checkout}/>
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
