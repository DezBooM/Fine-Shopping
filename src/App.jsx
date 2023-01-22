import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Cart from "./components/Cart"
import Home from "./components/Home"
import Navbar from "./components/Navbar"

function App() {
  const [darkTheme, setDarkTheme] = useState(false)

  const handleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-lime-100 min-h-screen dark:bg-stone-600 text-lime-900  dark:text-stone-100 font-red-hat-mono ">
        <Navbar darkTheme={darkTheme} handleTheme={handleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
