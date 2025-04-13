import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../../components/Container";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import ReviewPosted from "../../../components/ReviewPosted";
import MoviePosted from "../../../components/MoviePosted";

const IndividualProfile = () => {
  const { pid } = useParams();
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getUserById = () => {
    axios
      .get("/user/" + pid)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        return true;
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <Container>
      {loading && (
        <div className="min-h-full w-full flex justify-center items-center">
          <FaSpinner className="animate-spin w-100 h-100 mt-2" />
        </div>
      )}
      {!loading && userData && (
        <>
          <div
            className="flex md:flex-row flex-col mt-2 md:justify-between justify-center items-center gap-3
         bg-background-primary/50 px-3 py-2 rounded-lg"
          >
            <div>
              <p className="flex items-center gap-4">
                <span className="lg:text-4xl md:text-3xl text-2xl font-bold">
                  {userData.user.name}
                </span>
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-center items-center md:text-lg text-md">
              <p className="flex flex-col justify-center items-center">
                <p>Followers</p>
                <p className="text-sm text-foreground/50">
                  {userData.user.followers.length}
                </p>
              </p>
              <p className="flex flex-col justify-center items-center">
                <p>Following</p>
                <p className="text-sm text-foreground/50">
                  {userData.user.following.length}
                </p>
              </p>
            </div>
          </div>
          {userData.user.role === "blogger" && (
            <div className="mt-6">
              <h3 className="text-2xl font-heading mb-2 text-primary">
                Movies Posted
              </h3>
              <div className="flex gap-3 flex-col flex-wrap ">
                {userData.movies.length > 0 ? (
                  userData.movies.map((movie: any) => (
                    <MoviePosted m={movie} handleRate={null} isBlogger={true} />
                  ))
                ) : (
                  <p className="text-gray-300 italic">No Movies Posted</p>
                )}
              </div>
            </div>
          )}

          {userData.user.role === "user" && (
            <div className="mt-6">
              <h3 className="text-2xl font-heading mb-2 text-primary">
                Reviews Posted
              </h3>
              <div className="flex flex-col gap-3 flex-wrap ">
                {userData.reviews.length > 0 ? (
                  userData.reviews.map((review: any) => (
                    <ReviewPosted review={review} />
                  ))
                ) : (
                  <p className="text-gray-300 italic">No Reviews Posted</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default IndividualProfile;
