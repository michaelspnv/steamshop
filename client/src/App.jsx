import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { Market } from "./pages/Market"
import { Product } from "./pages/Product"
import { About } from "./pages/About"
import { SearchResults } from "./pages/SearchResults"
import { Cart } from "./pages/Cart"
import { Payment } from "./pages/Payment"
import { Success } from "./pages/Success"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  )
}

export default App
