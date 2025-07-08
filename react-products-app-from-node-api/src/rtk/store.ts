import { configureStore, combineReducers, type Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartApi } from './services/cartApi';
import authReducer from './features/auth/authSlice';
import profileReducer from './features/auth/profileSlice';
import { authMiddleware } from './middlewares/authMiddleware';
import { profileMiddleware } from './middlewares/profileMiddleware';
import { assistantApi } from './services/assistantApi';

// Persist config for auth only
const authPersistConfig = {
  key: 'auth', // Unique key for the persisted state
  storage,
  whitelist: ['user'] // Only persist the user object
};

const rootReducer = combineReducers({
  [cartApi.reducerPath]: cartApi.reducer, // Add the cartApi reducer
  auth: persistReducer(authPersistConfig, authReducer), // Persist the auth reducer
  profile: profileReducer, // Add the profile reducer
  [assistantApi.reducerPath]: assistantApi.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }) // Disable serializable check
      .concat(cartApi.middleware) // Add the cartApi middleware
      .concat(authMiddleware as Middleware) // Add the auth middleware
      .concat(profileMiddleware) // Add the profile middleware
      .concat(assistantApi.middleware)
      
});



export default store;
export const persistor = persistStore(store); // Create the persistor
export type RootState = ReturnType<typeof store.getState>; // Define RootState
export type AppDispatch = typeof store.dispatch; // Define AppDispatch

import { setupListeners } from '@reduxjs/toolkit/query'
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)