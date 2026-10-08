import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import {
  RestaurantProvider
} from "./context/RestaurantContext";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <RestaurantProvider>

        <App />

      </RestaurantProvider>

    </BrowserRouter>

  </React.StrictMode>

);