import { AiOutlineArrowUp } from "react-icons/ai"
import { useCartContext } from "./contexts/CartContextProvider"
import Rating from "./Rating"

function Filter({ windowSize, setIsActiveFilter }) {
  const {
    filteredState: { byRating, sort, byStock, byFastDelivery },
    filteredDispatch,
  } = useCartContext()

  const handleReview = (i) =>
    filteredDispatch({ type: "FILTER_BY_RATING", payload: i })

  const clearFilters = () => filteredDispatch({ type: "CLEAR_FILTERS" })

  return (
    <form className="flex flex-col sm:h-1/2 sm:space-y-5 w-full sm:w-1/3  px-4 sm:2 sm:pt-10 text-lg bg-lime-300 dark:bg-stone-900 rounded-b-lg">
      <fieldset>
        <div className="flex justify-between items-center sm:mb-5">
          <label htmlFor="radio1">Ascending</label>
          <input
            name="sort"
            id="radio1"
            className=" accent-lime-900 dark:accent-stone-600 w-4 h-4"
            type="radio"
            value="ascending"
            checked={sort === "ascending"}
            onChange={(e) =>
              filteredDispatch({
                type: "SORT_BY_PRICE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="radio2">Descending</label>
          <input
            name="sort"
            id="radio2"
            className=" accent-lime-900 dark:accent-stone-600 w-4 h-4"
            type="radio"
            value="descending"
            checked={sort === "descending"}
            onChange={(e) =>
              filteredDispatch({
                type: "SORT_BY_PRICE",
                payload: e.target.value,
              })
            }
          />
        </div>
      </fieldset>
      <div className="flex justify-between">
        <label htmlFor="check1">Fast delivery only</label>
        <input
          id="check1"
          type="checkbox"
          className=" accent-lime-900 dark:accent-stone-600 w-4 h-4"
          checked={byFastDelivery}
          onChange={() => filteredDispatch({ type: "FILTER_BY_DELIVERY" })}
        />
      </div>
      <div className="flex justify-between">
        <label htmlFor="check2">Include out of stock</label>
        <input
          id="check2"
          type="checkbox"
          className=" accent-lime-900 dark:accent-stone-600 w-4 h-4"
          checked={byStock}
          onChange={() => filteredDispatch({ type: "FILTER_BY_STOCK" })}
        />
      </div>
      <div className="flex justify-between pb-4">
        <label>Rating</label>
        <div className="flex flex-col items-end mt-2">
          <Rating rate={byRating} handleReview={handleReview} />
          <button
            className="bg-lime-900 text-sm rounded-full font-bold tracking-wider border-none py-1 px-2 mt-2 text-stone-100 dark:bg-stone-600"
            type="button"
            onClick={clearFilters}
            title="Clear rating filter"
          >
            Clear
          </button>
        </div>
      </div>
      {windowSize.width < 648 && (
        <div className="flex justify-center">
          <AiOutlineArrowUp
            className="cursor-pointer text-2xl bg-lime-500 dark:bg-stone-700 font-bold rounded-full my-1"
            type="button"
            onClick={() => setIsActiveFilter((prev) => !prev)}
          />
        </div>
      )}
    </form>
  )
}

export default Filter
