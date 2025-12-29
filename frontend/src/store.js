import {combineReducers,applyMiddleware} from 'redux'
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { updateUserPreferencesReducer,getProductByIdReducer,addToWishListReducer,deletePriceWithoutReducer, getSearchedProductsReducer, getTopRatedProductsReducer,getPricesReducer, addPriceReducer, deletePriceReducer,getMostDownloadedProductsReducer,getYoungestProductsReducer,getOldestProductsReducer } from './reducers/productReducer';
import { getUserReducer } from './reducers/userReducers';

const reducer = combineReducers({
    getProductByIdReducer:getProductByIdReducer,
    getTopRatedProductsReducer: getTopRatedProductsReducer,
    getMostDownloadedProductsReducer:getMostDownloadedProductsReducer,
    getSearchedProductsReducer:getSearchedProductsReducer,
    getPricesReducer:getPricesReducer,
    addPriceReducer:addPriceReducer,
    deletePriceReducer:deletePriceReducer,
    deletePriceWithoutReducer:deletePriceWithoutReducer,
    addToWishListReducer:addToWishListReducer,
    updateUserPreferencesReducer:updateUserPreferencesReducer,
    getUserReducer:getUserReducer,
    getYoungestProductsReducer:getYoungestProductsReducer,
    getOldestProductsReducer:getOldestProductsReducer
})


const initialState = {

}

const middleware = [thunk]



const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store