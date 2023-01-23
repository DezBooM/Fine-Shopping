import { useEffect, useState } from "react"
import { useCartContext } from "./contexts/CartContextProvider"
import Filter from "./Filter"
import Product from "./Product"
import { AiOutlineArrowDown } from "react-icons/ai"

function Home() {
  const {
    state: { products },
    filteredState: { byStock, byFastDelivery, byRating, search, sort },
  } = useCartContext()
  const [isActiveFilter, setIsActiveFilter] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const getSortedProducts = () => {
    let sortedProducts = products

    if (sort) {
      sortedProducts.sort((a, b) =>
        sort === "ascending" ? a.price - b.price : b.price - a.price
      )
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((product) => product.inStock)
    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((product) => product.fastDelivery)
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (product) => product.ratings === byRating
      )
    }
    if (search) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    return sortedProducts
  }

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start">
      {windowSize.width > 648 || isActiveFilter ? (
        <Filter windowSize={windowSize} setIsActiveFilter={setIsActiveFilter} />
      ) : (
        <AiOutlineArrowDown
          className="cursor-pointer ml-4 text-2xl bg-lime-500 dark:bg-stone-700 font-bold rounded-full my-2"
          onClick={() => setIsActiveFilter(!isActiveFilter)}
        />
      )}
      <div className="flex flex-wrap gap-2 justify-center sm:mt-8 w-full">
        {getSortedProducts().map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Home
