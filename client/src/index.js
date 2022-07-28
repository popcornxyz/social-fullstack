import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/index.scss";

// Redux
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
