import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import {selectCollectionFetching, selectIsCollectionFetching} from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";
import withSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
    isloadng: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;