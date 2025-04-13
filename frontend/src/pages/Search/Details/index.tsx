import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../../components/Container";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { ActorPills } from "../../../components/ActorPills";
import { Link } from "react-router-dom";

const Details = () => {
  const { title } = useParams();
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
    <>
      <Container className="flex md:flex-row flex-col justify-center md:items-start items-center gap-2 ">
        <div className="w-72 bg-background-primary/40 h-max rounded-md">
          <div className="w-72  overflow-hidden aspect-square relative">
            <img
              src={searchResult?.Poster}
              className="absolute inset-0 w-full h-full rounded-t-md object-cover"
              alt=""
            />
          </div>
          <div className="px-2 pt-1 pb-4">
            <div className="flex justify-between lg:text-3xl md:text-2xl font-semibold text-xl">
              <p>{searchResult?.Title}</p>
              <p>{searchResult?.Year}</p>
            </div>
            <div>
              <table className="table-auto w-full">
                <tr>
                  <td>Released on</td>
                  <td>{searchResult?.Released}</td>
                </tr>
                <tr>
                  <td>Run time</td>
                  <td>{searchResult?.Runtime}</td>
                </tr>
                <tr>
                  <td>Boxoffice </td>
                  <td>{searchResult?.BoxOffice}</td>
                </tr>
                <tr>
                  <td>Rated</td>
                  <td>{searchResult?.Rated}</td>
                </tr>
              </table>
              <div className="flex gap-1 mt-2">
                {searchResult?.imdbRating > 0 &&
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
            </div>
          </div>
        </div>
        <div className="bg-background-primary/40 rounded-md px-4 py-2 flex-1">
          <div className="my-2">
            <h1 className="text-2xl font-heading text-primary">Director</h1>
            <Link
              to={"https://en.wikipedia.org/wiki/" + searchResult?.Director}
              title={"Click to now more about " + searchResult?.Director}
              target="_blank"
            >
              <ActorPills actor={searchResult?.Director} />
            </Link>
          </div>
          <div className="my-2">
            <h1 className="text-2xl font-heading text-primary">Plot</h1>
            <p>{searchResult?.Plot}</p>
          </div>
          <div className="my-2">
            <h1 className="text-2xl font-heading text-primary">Genre</h1>
            <div className="flex flex-wrap gap-2">
              {searchResult?.Genre?.split(",").map((genre: string) => (
                <ActorPills actor={genre} key={genre} />
              ))}
            </div>
          </div>
          <div className="my-2">
            <h1 className="text-2xl font-heading text-primary">Actors</h1>
            <div className="flex flex-wrap gap-2">
              {searchResult?.Actors?.split(",").map((actor: string) => (
                <Link
                  to={"https://en.wikipedia.org/wiki/" + actor}
                  title={"Click to know more about " + actor}
                  target="_blank"
                >
                  <ActorPills actor={actor} key={actor} />
                </Link>
              ))}
            </div>
          </div>
          <div className="my-2">
            <h1 className="text-2xl font-heading text-primary">Awards</h1>
            <p>{searchResult.Awards}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Details;
