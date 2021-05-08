import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import indexReducer from './reducers/';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, indexReducer);
const logger = createLogger();
const enhancer = applyMiddleware(thunkMiddleware, logger);

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

export { store, persistor };
