// import { applyMiddleware, createStore } from "redux";
// import { createLogger } from "redux-logger";
// import rpm from "redux-promise-middleware";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage/session";
// import indexReducer from "./reducers";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, indexReducer);

// //MIDDLWARE
// const logger = createLogger();
// const enhancers = applyMiddleware(rpm, logger);

// let store = createStore(persistedReducer, enhancers);
// let persistor = persistStore(store);

// export { store, persistor };

import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

import indexReducer from "./reducers/";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, indexReducer);
const logger = createLogger();
const enhancer = applyMiddleware(thunkMiddleware, logger);

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

export { store, persistor };
