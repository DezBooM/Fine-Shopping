import { AiFillStar, AiOutlineStar } from "react-icons/ai"

function Rating({ rate, handleReview }) {
  return (
    <div className="cursor-pointer flex items-center text-lime-900 dark:text-stone-100 text-lg">
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => handleReview(i + 1)}>
          {rate > i ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      ))}
    </div>
  )
}

export default Rating
