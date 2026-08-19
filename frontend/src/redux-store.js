import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { updateUserPreferencesReducer,getProductByIdReducer,wishListReducer,deletePriceWithoutReducer, getSearchedProductsReducer, getTopRatedProductsReducer,getPricesReducer, addPriceReducer, deletePriceReducer,getMostDownloadedProductsReducer,getYoungestProductsReducer,getOldestProductsReducer } from './reducers/productReducer';
import { getUserReducer } from './reducers/userReducers';

const reducer = combineReducers({
    gameDetails: getProductByIdReducer,
    topRatedGames: getTopRatedProductsReducer,
    mostDownloadedGames: getMostDownloadedProductsReducer,
    searchResults: getSearchedProductsReducer,
    prices: getPricesReducer,
    addedPrice: addPriceReducer,
    deletedPrice: deletePriceReducer,
    deletedPrices: deletePriceWithoutReducer,
    wishlist: wishListReducer,
    userPreferences: updateUserPreferencesReducer,
    currentUser: getUserReducer,
    newestGames: getYoungestProductsReducer,
    oldestGames: getOldestProductsReducer,
})

const store = configureStore({ reducer })

export default store
