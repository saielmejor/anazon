import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./screens/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}> 
      <App />
      </PayPalScriptProvider>
      
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
