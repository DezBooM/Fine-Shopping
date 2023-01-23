import { useCartContext } from "./contexts/CartContextProvider"
import Rating from "./Rating"

function Product(product) {
  const {
    state: { cart },
    dispatch,
  } = useCartContext()

  return (
    <div className="sm:mx-8 mb-2 w-full sm:w-1/4 flex flex-col items-center sm:items-start justify-center">
      <img
        className="rounded-md w-3/4 h-44 sm:w-72 sm:h-56 object-cover"
        src={product.image}
        alt={product.name}
      />
      <h1 className="font-bold sm:text-lg">{product.name}</h1>
      <span className="text:sm sm:text-lg">${product.price.split(".")[0]}</span>
      {product.fastDelivery ? (
        <div className="text-xs sm:text-base">Fast Delivery</div>
      ) : (
        <div className="text-xs sm:text-base">5-7 business days delivery</div>
      )}
      <Rating rate={product.ratings} />
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className="disabled:opacity-30 active:shadow-custom-inner text-stone-100 bg-lime-900 dark:bg-stone-900 mt-2 px-2 py-1 rounded-lg"
        disabled={
          !product.inStock || cart.some((item) => item.id === product.id)
        }
      >
        {!product.inStock
          ? "Out of stock"
          : cart.some((item) => item.id === product.id)
          ? "Added in cart"
          : "Add to cart"}
      </button>
    </div>
  )
}

export default Product
