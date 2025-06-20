// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
// import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';

const persistConfig = {
  key: 'cart', // key for the auth state
  storage, // storage mechanism (local storage or session storage)
  // whitelist: [
  //   // 'cart',
  //   'auth'
  // ], // which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, cartReducer);


// Configure the Redux store
const store: any = configureStore({ 
  reducer: persistedReducer
});

export default store;

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;