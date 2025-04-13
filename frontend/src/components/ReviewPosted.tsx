import React from 'react'
import { FaStar } from 'react-icons/fa';

const ReviewPosted = ({review} : {review:any}) => {
  return (
    <div className="w-full bg-background-primary/50 p-2 rounded-md">
      <h1 className="md:text-xl text-lg">{review.movieId.title}</h1>
      <div className="flex gap-1">
        {Array(review.rating)
          .fill(review)
          .map(() => {
            return <FaStar className="text-primary" />;
          })}
        {Array(5 - review.rating)
          .fill(review)
          .map(() => {
            return <FaStar className='text-gray-500' />;
          })}
      </div>
      <hr className="border-t-2 border-background-secondary my-2" />
      <p>{review.comment}</p>
    </div>
  );
}

export default ReviewPosted
