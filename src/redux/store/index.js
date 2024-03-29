import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { getListOfPatient } from "../reducer/patientReducer.js";
import { fetchPatient } from "../reducer/ListofPatient.js";
import { fetchQuery } from "../reducer/QueryReducer";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const bigReducer = combineReducers({
  list: getListOfPatient,
  patient: fetchPatient,
  query: fetchQuery,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
