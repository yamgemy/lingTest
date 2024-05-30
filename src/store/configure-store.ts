import AsyncStorage from "@react-native-async-storage/async-storage";
import { legacy_createStore as createStore, Reducer } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistConfig, persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { rootReducer } from "../reducers";

const persistConfig = {
  key: 'redux-persist-key',
  storage: AsyncStorage,
  // transform: [networkTransform]
} as PersistConfig<any, any, any, any>;

export const configureStore = () => {
  console.log('@configureStore run');
  const composeEnhancers = composeWithDevTools({});
  const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);
  //2nd arg in createStore preloadedState is not neccessary
  const store = createStore(persistedReducer, undefined, composeEnhancers()); 
  const persistor = persistStore(store, null);
  return { store, persistor };
};