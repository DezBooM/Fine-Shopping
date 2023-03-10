import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { CartContextProvider } from "./contexts/CartContextProvider"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartContextProvider>
  </React.StrictMode>
)
