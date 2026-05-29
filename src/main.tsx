import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { MDXProvider } from "@mdx-js/react"
import "./index.css"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MDXProvider>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </StrictMode>,
)
