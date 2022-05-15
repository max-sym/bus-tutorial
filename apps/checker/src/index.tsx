import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@bus/ui/src/custom.css"
import "@bus/ui/src/index.css"
import "react-toastify/dist/ReactToastify.min.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
