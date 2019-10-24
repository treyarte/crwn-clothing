import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import {fetchCollectionsStart} from "../../redux/shop/shop.actions";



class ShopPage extends React.Component{
 
  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {fetchCollectionsStart} = this.props;
    fetchCollectionsStart(); 
    //observable pattern 
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   console.log(collectionsMap);
    //   updateCollections(collectionsMap);
    //   this.setState({loading: false});
    // })
    // promise ex

//fetch ex
    // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-1ca08/databases/(default)/documents/collection")
    // .then(response => response.json())
    // .then(collection => console.log(collection));
  }

  componentWillUnmount(){
    // this.unsubscribeFromSnapshot();
  }

  render(){
    const {match, isCollectonsLoaded} = this.props;

    return (
      <div className="shop-page">
      
        <Route 
          exact 
          path={`${match.path}`} 
          component = {CollectionsOverviewContainer}
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          component = {CollectionPageContainer}
        />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
  // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);