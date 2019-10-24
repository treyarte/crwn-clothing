import {all, call} from "redux-saga/effects";
import {fetchCollectionsStart, fetchCollectionsAsync} from "./shop/shop.sagas";
import {UserSages} from "./user/user.sagas";
import {cartSagas} from "./cart/cart.sagas";
import {shopSagas} from "./shop/shop.sagas";

export default function* rootSaga(){
    yield all([
        call(fetchCollectionsStart),
        call(UserSages),
        call(cartSagas),
        call(shopSagas),
    ])
}