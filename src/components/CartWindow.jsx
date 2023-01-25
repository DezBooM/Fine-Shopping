import { BsTrashFill } from "react-icons/bs"
import { useCartContext } from "./contexts/CartContextProvider"
import { motion } from "framer-motion"

function CartWindow({ setIsActive }) {
  const {
    state: { cart },
    dispatch,
  } = useCartContext()
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border-2 border-lime-600 bg-lime-200 dark:bg-stone-600 dark:border-stone-900 absolute right-7 w-96 rounded-lg z-10"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {cart.length !== 0 ? (
        cart?.map((product) => (
          <motion.div
            layout
            className="flex justify-between m-2 items-center"
            key={product.id}
          >
            <img
              className="rounded-full w-12 h-12 object-cover"
              src={product.image}
            />
            <div className="flex flex-col items-center">
              <h1 className="font-bold">{product.name}</h1>
              <span className="text-xs">${product.price.split(".")[0]}</span>
            </div>
            <BsTrashFill
              onClick={() =>
                dispatch({ type: "DELETE_FROM_CART", payload: product })
              }
              className="text-lg cursor-pointer"
              title="Delete from cart"
            />
          </motion.div>
        ))
      ) : (
        <motion.div layout>
          <p className="text-center my-2 text-xl">Cart is empty!</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CartWindow
