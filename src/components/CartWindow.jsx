import { BsTrashFill } from "react-icons/bs"
import { useCartContext } from "./contexts/CartContextProvider"

function CartWindow({ setIsActive }) {
  const {
    state: { cart },
    dispatch,
  } = useCartContext()
  return (
    <div
      className="border-2 border-lime-600 bg-lime-100 dark:bg-stone-600 dark:border-stone-900 absolute right-7 w-96 rounded-lg z-10"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {cart.length !== 0 ? (
        cart?.map((product) => (
          <div
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
          </div>
        ))
      ) : (
        <p className="text-center my-2 text-xl">Cart is empty!</p>
      )}
    </div>
  )
}

export default CartWindow
