import { Routes, Route } from "react-router-dom"
import { Market } from "./pages/Market"
import { Product } from "./pages/Product"
import { SearchResults } from "./pages/SearchResults"
import { Payment } from "./pages/Payment"

function App() {
  return (
    <Routes>
      <Route path="/market" element={<Market />} />
      <Route path="/market/:id" element={<Product />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  )
}

export default App
