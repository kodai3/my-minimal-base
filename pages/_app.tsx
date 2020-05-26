import ThemeProvider from "@material-ui/styles/ThemeProvider";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import withReduxStore from "src/redux/withReduxStore";
import theme from "src/styles/theme";

class MyApp extends App<{ reduxStore: Store }> {
  public persistor: Persistor;

  constructor(props: any) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Provider store={reduxStore}>
          <PersistGate
            loading={<Component {...pageProps} />}
            persistor={this.persistor}
          >
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { query } = ctx;
  const { community_id } = query;

  const pageProps =
    Component && Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

  return {
    pageProps: {
      ...pageProps,
      communityId: community_id,
    },
  };
};

export default withReduxStore(MyApp);
