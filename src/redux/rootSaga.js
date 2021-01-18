import { all, call } from 'redux-saga/effects';
import userSagas from './User/user.sagas';
import productSagas from './Products/products.sagas';
import ordersSagas from './Orders/orders.sagas';
import gallerySagas from './Gallery/gallery.sagas'

//all alows us to resolve effects in parrell, and call
// allows us to call functions

//function* means its a generator function
export default function* rootSaga() {
    yield all([
    call(userSagas), 
    call(productSagas),
    call(ordersSagas),
    call(gallerySagas)
    ])
}