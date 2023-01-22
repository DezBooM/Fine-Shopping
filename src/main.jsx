import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { CartContextProvider } from "./components/contexts/CartContextProvider"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </CartContextProvider>
)
