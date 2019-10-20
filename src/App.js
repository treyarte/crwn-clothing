import React, {Component} from 'react';

import './App.css';
import HomePage from "./pages/homepage.component";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-and-sign-up.component";
import Checkout from "./pages/checkout/checkout.component";

import {auth, createUserProfileDocument, addCollectionAndDocuments} from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector";
import {createStructuredSelector} from "reselect";
import {selectCollectionsForPreview, add} from "./redux/shop/shop.selector";
class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser, collectionsArray} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef =  await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
        
      }
      setCurrentUser(userAuth );
      // addCollectionAndDocuments("collection", collectionsArray.map(({title, items}) =>({title, items})));
    });
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps )(App);
