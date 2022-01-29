import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import createClient from "./util/apolloClient";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const client = createClient();
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,

  document.getElementById("root")
);

reportWebVitals();
// reportWebVitals(console.log);
