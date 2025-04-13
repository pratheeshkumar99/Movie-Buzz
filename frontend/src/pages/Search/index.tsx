import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { useLocation } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ActorPills } from "../../components/ActorPills";
import { FaStar } from "react-icons/fa";

const Search = () => {
  const location = useLocation();
  const [queryParams] = useSearchParams(location.search);
  const title = queryParams.get("title");
  const [searchResult, setSearchResult] = useState<any>({});
  const getResults = async () => {
    try {
      const res = await fetch(
        "https://www.omdbapi.com/?apikey=" +
          process.env.REACT_APP_API_KEY +
          "&t=" +
          title
      );
      const data = await res.json();
      setSearchResult(data);
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    getResults();
  }, [title]);

  return (
    <Container>
      <h1 className="wd-heading mb-2">Search Results</h1>
      <div className="bg-background-primary flex items-start rounded-md w-full border-2 border-primary border-opacity-50 ">
        <div className="w-72 overflow-hidden aspect-square relative">
          <img
            src={searchResult?.Poster}
            className="absolute inset-0  w-full h-full rounded-t-md object-cover"
            alt=""
          />
        </div>
        <div className="w-full px-3 py-1">
          <div className="flex  justify-between items-center">
            <p className="md:text-2xl text-xl font-semibold">
              {searchResult.Title}
            </p>
            <p>{searchResult.Year}</p>
          </div>
          <p>{searchResult.Plot}</p>
          <p className="text-sm text-slate-500 italic">
            {searchResult.Language}
          </p>
          <div className="flex gap-1 mt-2">
            { searchResult?.imdbRating > 0 &&
            Array(Math.round(searchResult?.imdbRating))
              .fill(null)
              .map(() => {
                return <FaStar className="text-primary" />;
              })}
            {10 - Math.round(searchResult?.imdbRating) > 0 &&
              Array(10 - Math.round(searchResult?.imdbRating))
                .fill(null)
                .map(() => {
                  return <FaStar className="text-gray-500" />;
                })}
          </div>
          <Link to={"/details/" + title} className="wd-button float-left my-2">More Details</Link>
        </div>
      </div>
    </Container>
  );
};

export default Search;
