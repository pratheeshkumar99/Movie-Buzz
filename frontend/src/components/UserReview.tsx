import React from 'react'
import { FaStar } from 'react-icons/fa';

const UserReview = ({rating , movie} : {rating : any , movie : string}) => {
  return (
    <div className="w-full bg-background-primary/50 p-2 rounded-md">
      {movie && <h1 className="md:text-xl text-lg">{movie}</h1>}
      <div className="flex justify-between">
        <div className="flex gap-1">
          {Array(rating.rating)
            .fill(rating)
            .map(() => {
              return <FaStar className="text-primary" />;
            })}
          {Array(5 - rating.rating)
            .fill(rating)
            .map(() => {
              return <FaStar className="text-gray-500" />;
            })}
        </div>
        <p className="text-sm italic text-gray-600">By {rating.userId.name}</p>
      </div>

      <hr className="border-t-2 border-background-secondary my-2" />
      <p>{rating.comment}</p>
    </div>
  );
}

export default UserReview
