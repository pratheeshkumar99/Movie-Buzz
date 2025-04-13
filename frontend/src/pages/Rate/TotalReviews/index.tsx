import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../../components/Container";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import UserReview from "../../../components/UserReview";

const TotalReviews = () => {
  const { mid } = useParams();
  const [movie, setMovie] = useState<any>();

  const getMovieReviews = async () => {
    try {
      const response = await axios.get("/movies/" + mid);
      setMovie(response.data);
    } catch (e) {}
  };
  console.log(movie);

  useEffect(() => {
    getMovieReviews();
  }, []);

  return (
    <Container>
      <div className="flex flex-col gap-2">
        {movie?.ratings.length > 0 &&
          movie?.ratings.map((rating: any) => (
            <UserReview rating={rating} movie={""} />
          ))}
      </div>
    </Container>
  );
};

export default TotalReviews;
