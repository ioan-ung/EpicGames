import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { updateUserPreferencesReducer,getProductByIdReducer,wishListReducer,deletePriceWithoutReducer, getSearchedProductsReducer, getTopRatedProductsReducer,getPricesReducer, addPriceReducer, deletePriceReducer,getMostDownloadedProductsReducer,getYoungestProductsReducer,getOldestProductsReducer } from './reducers/productReducer';
import { getUserReducer } from './reducers/userReducers';

const reducer = combineReducers({
    getProductByIdReducer,
    getTopRatedProductsReducer,
    getMostDownloadedProductsReducer,
    getSearchedProductsReducer,
    getPricesReducer,
    addPriceReducer,
    deletePriceReducer,
    deletePriceWithoutReducer,
    wishListReducer,
    updateUserPreferencesReducer,
    getUserReducer,
    getYoungestProductsReducer,
    getOldestProductsReducer,
})

const store = configureStore({ reducer })

export default store
