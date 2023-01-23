import { useEffect, useState } from "react"
import { BsTrashFill } from "react-icons/bs"
import { useCartContext } from "./contexts/CartContextProvider"
import Rating from "./Rating"
import SuccessMsg from "./SuccessMsg"

function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useCartContext()
  const [total, setTotal] = useState(0)
  const [purchase, setPurchase] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleQtyChange = (e, id) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: { id: id, qty: e.target.value },
    })
  }

  const handlePurchase = () => {
    setPurchase(true)
    setTimeout(() => {
      dispatch({ type: "CHECKOUT" })
      setPurchase(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3500)
    }, 2000)
  }

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
  }, [cart])

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between">
      <div className="flex flex-col justify-center sm:w-2/3">
        {cart.length === 0 ? (
          <p className="text-center my-2 font-bold mt-4 sm:mt-2 text-xl sm:text-3xl">Cart is empty!</p>
        ) : (
          cart.map((product) => (
            <div
              className="flex items-center justify-between m-1 sm:m-4"
              key={product.id}
            >
              <img
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-md"
                src={product.image}
                alt={product.name}
              />
              <h1 className="font-bold text-sm sm:text-base ml-2 w-1/4">
                {product.name}
              </h1>
              <span className="text-xs sm:text-base mr-1">
                ${product.price.split(".")[0]}
              </span>
              <Rating rate={product.ratings} />
              <select
                value={product.qty}
                onChange={(e) => handleQtyChange(e, product.id)}
                className="dark:bg-stone-900 rounded p-1"
              >
                {[...Array(product.inStock).keys()].map((option) => (
                  <option key={option + 1}>{option + 1}</option>
                ))}
              </select>
              <BsTrashFill
                onClick={() =>
                  dispatch({ type: "DELETE_FROM_CART", payload: product })
                }
                className="text-xl cursor-pointer"
                title="Delete from cart"
              />
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col relative items-center justify-start gap-10 font-bold bg-lime-300 dark:bg-stone-900  w-full sm:w-1/3 pb-20 sm:px-4 sm:pt-10 mt-5 sm:mt-0 text-lg rounded-b-lg h-1/3">
        <h1 className="text-2xl">Subtotal({cart.length}) items</h1>
        <span className="text-lg">Total: ${total}</span>
        <button
          onClick={handlePurchase}
          disabled={cart.length === 0}
          className="bg-lime-900 disabled:opacity-30 text-stone-100 dark:bg-stone-600 px-4 py-2 rounded-full active:shadow-custom-inner"
        >
          {purchase ? "Waiting..." : "Proceed to checkout"}
        </button>
        {success && <SuccessMsg />}
      </div>
    </div>
  )
}

export default Cart
