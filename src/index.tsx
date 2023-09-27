import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./components/app";

const root = createRoot(document.querySelector("#app") as HTMLElement);
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
);
