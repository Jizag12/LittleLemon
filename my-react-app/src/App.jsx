import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Reservations from "./pages/Reservations"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservations" element={<Reservations />} />
    </Routes>
  )
}

export default App
