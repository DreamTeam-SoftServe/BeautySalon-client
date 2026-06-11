import React from "react";
import "../index.css";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./shared/i18n";
import { AuthProvider } from "./shared/auth/context";
import { CartProvider } from './app/providers/CartProvider'; // <--- Імпортуйте CartProvider


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
