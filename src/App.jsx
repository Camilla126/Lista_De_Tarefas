import { BrowserRouter } from "react-router-dom"
import RoutesApp from "./routes"
import { ToastContainer } from "react-toastify"

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />


      <RoutesApp />
    </BrowserRouter>
  )
}