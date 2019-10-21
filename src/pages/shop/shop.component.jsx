import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";

const CollectionOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component{
  state ={
    loading: true
  }
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection("collection");
    //observable pattern 
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   console.log(collectionsMap);
    //   updateCollections(collectionsMap);
    //   this.setState({loading: false});
    // })
    // promise ex
    collectionRef.get().then(
      snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        console.log(collectionsMap);
        updateCollections(collectionsMap);
        this.setState({loading: false});
      });
//fetch ex
    // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-1ca08/databases/(default)/documents/collection")
    // .then(response => response.json())
    // .then(collection => console.log(collection));
  }

  componentWillUnmount(){
    // this.unsubscribeFromSnapshot();
  }

  render(){
    const {match} = this.props;
    const {loading} = this.state;
    return (
      <div className="shop-page">
      
        <Route 
          exact 
          path={`${match.path}`} 
          render={props =>(
            <CollectionOverviewWithSpinner isLoading={loading}{...props}/>
            )}
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props}/>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);