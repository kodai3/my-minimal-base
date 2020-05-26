import { createStore, Reducer } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Types from "ReduxTypes";
import { reducers } from "./modules/reducers";

interface ServerState {
  serverState: { fromServer: string };
}

const makeConfiguredStore = (
  someReducer: Reducer<any>,
  initialState: Types.RootState | ServerState | undefined
) => {
  return createStore(someReducer, initialState);
};

export default function configureStore(
  initialState: Types.RootState | undefined
) {
  const isServer = typeof window === "undefined";
  if (isServer) {
    const serverInitialState = initialState || {
      serverState: { fromServer: "foo" },
    };
    const rootReducerInServer = reducers;

    return makeConfiguredStore(rootReducerInServer, serverInitialState);
  }
  const rootReducer = reducers;
  const persistConfig = {
    key: "primary",
    storage,
    // pick the State from reducer which you want to persist
    // whitelist: [],
    // transforms: [],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  return makeConfiguredStore(persistedReducer, initialState);
}
