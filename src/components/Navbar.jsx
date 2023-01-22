import { useState } from "react"
import { BsCart, BsCartFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import CartWindow from "./CartWindow"
import { useCartContext } from "./contexts/CartContextProvider"

function Navbar({ darkTheme, handleTheme }) {
  const [isActive, setIsActive] = useState(false)
  const {
    state: { cart },
    filteredState: { search },
    filteredDispatch,
  } = useCartContext()

  const handleMouseEnter = () => {
    if (!navigator.userAgentData.mobile) setIsActive(true)
  }

  return (
    <nav className="flex justify-between items-center py-1 px-1 sm:py-3 sm:px-4 border-b border-lime-600 bg-lime-300 dark:bg-stone-900 dark:border-stone-500 ">
      <Link
        to="/"
        className="font-bold tracking-wider text-sm sm:text-2xl p-2 bg-lime-500 dark:bg-stone-700 rounded-lg"
      >
        FINE SHOPPING
      </Link>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          filteredDispatch({
            type: "FILTER_BY_SEARCH",
            payload: e.target.value,
          })
        }}
        className="rounded-full w-1/3 px-2 py-1 outline-none shadow-sm hover:shadow-xl dark:bg-stone-700"
      />
      <div className="flex items-center">
        <div className="relative">
          <Link to="/cart">
            {cart.length === 0 ? (
              <BsCart
                className="h-8 w-8 sm:mr-6"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsActive(false)}
              />
            ) : (
              <BsCartFill
                className="h-8 w-8 sm:mr-6"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsActive(false)}
              />
            )}
          </Link>
          {isActive && <CartWindow setIsActive={setIsActive} />}
        </div>
        <button
          type="button"
          onClick={handleTheme}
          className="bg-lime-500 rounded-full px-2 py-1 sm:px-4 sm:py-2 font-bold dark:bg-stone-700"
        >
          {darkTheme ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
