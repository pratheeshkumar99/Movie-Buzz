import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Container from "../../components/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import MoviePosted from "../../components/MoviePosted";
import ReviewPosted from "../../components/ReviewPosted";
import UsersTable from "../../components/UsersTable";

const Profile = () => {
  const [userData, setUserData] = useState<any>();
  const [moviesReviewed, setMoviesReviewed] = useState<any>([]);

  const getProfileData = async () => {
    try {
      const response = await axios.get("/profile");
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  console.log(moviesReviewed);
  

  useEffect(() => {
    const fetchData = async () => {
      await getProfileData();
      // getMoviesReviewed();
    }

    fetchData();
  }, []);

  return (
    <Container>
      <div className="flex justify-between">
        <h1 className="wd-heading">Profile</h1>
        {userData && (
          <Link to={"/profile/edit/" + userData.user._id} className="wd-button">
            Edit
          </Link>
        )}
      </div>

      {userData && (
        <>
          <div
            className="flex md:flex-row flex-col mt-2 md:justify-between justify-center items-center gap-3
         bg-background-primary/50 px-3 py-2 rounded-lg"
          >
            <div>
              <p className="flex items-center gap-4">
                <span className="lg:text-4xl md:text-3xl text-2xl font-bold">
                  {userData.user.name}
                </span>{" "}
                <span className="bg-primary/50 px-4 py-1 rounded-xl">
                  {userData.user.role}
                </span>
              </p>
              <p className="text-sm text-foreground/50">
                {userData.user.email}
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-center items-center md:text-lg text-md">
              <Link
                to={"/profile/followers"}
                className="flex flex-col justify-center items-center"
              >
                <p>Followers</p>
                <p className="text-sm text-foreground/50">
                  {userData.user.followers.length}
                </p>
              </Link>
              <Link
                to={"/profile/following"}
                className="flex flex-col justify-center items-center"
              >
                <p>Following</p>
                <p className="text-sm text-foreground/50">
                  {userData.user.following.length}
                </p>
              </Link>
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

          {userData.user.role === "admin" && (
            <div>
              <div className="mt-6">
                <h3 className="text-2xl font-heading mb-2 text-primary">
                  Users
                </h3>
               <UsersTable/>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;
