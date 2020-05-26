import * as React from "react";
import Types from "ReduxTypes";
import { Window } from "src/interfaces";
import configureStore from "./configureStore";

declare const window: Window;

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState: Types.RootState | undefined) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return configureStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window.__NEXT_REDUX_STORE__) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

/**
 * _app.tsxにredux storeを追加するHOC
 *
 * @param App _app.tsxのclass component
 *
 * @returns _app.tsxのHOC
 */
export default (App: any) => {
  return class AppWithRedux extends React.Component {
    public reduxStore: any;
    constructor(props: any) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    public render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
