import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./_context/userContext.tsx";
import TransactionContextProvider from "./_context/transactionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <TransactionContextProvider>
          <App />
        </TransactionContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
