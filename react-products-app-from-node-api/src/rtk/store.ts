// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
// import productsReducer from './features/products/productsSlice';
import cartReducer from '../redux/features/cart/cartSlice';
import authReducer from '../rtk/features/auth/authSlice';
import profileReducer from '../rtk/features/auth/profileSlice';
import { authMiddleware } from './middlewares/authMiddleware';
import { profileMiddleware } from '../rtk/middlewares/profileMiddleware';

const persistConfig = {
  key: 'root', // key for the auth state
  storage, // storage mechanism (local storage or session storage)
  whitelist: [
    'auth',
    'cart'
  ], // which reducers to persist
};

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    profile:profileReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store: any = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(authMiddleware).prepend(profileMiddleware) ,
});

export default store;

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;