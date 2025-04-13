import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import axios from "axios";
import { FaPen, FaSpinner } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import { UserJoined } from "../../components/UserJoined";
import { Link, useNavigate } from "react-router-dom";
import { ActorPills } from "../../components/ActorPills";
import toast from "react-hot-toast";
import MoviePosted from "../../components/MoviePosted";
import UserReview from "../../components/UserReview";

const Home = () => {
  const { user , setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState<any>(
    {
      users: [],
      movies: [],
      reviews : []
    },
  );

  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/users");
      const data = await response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get("/movies");
      const data = await response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchReviews = async () => {
    try{
      const response = await axios.get("/reviews");
      const data = await response.data;
      return data;
    } catch(e){

    }
  }

  const fetchData = async () => {
    try {
      const usersPromise = fetchUsers();
      const moviesPromise = fetchMovies();
      const reviewsPromise = fetchReviews();
      const [users, movies, reviews] = await Promise.all([
        usersPromise,
        moviesPromise,
        reviewsPromise,
      ]);

      const filteredUsers = users?.filter((u:any) => u._id !== user?._id);
      const filteredMovies = movies?.filter((m:any) => m.userId !== user?._id);
      const filteredReviews = reviews?.filter((r:any) => r.userId !== user?._id);

    
      const sorter = (a:any, b:any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      const sortedFilteredUsers = filteredUsers?.sort(sorter);
      const sortedFilteredMovies = filteredMovies?.sort(sorter);
      const sortedFilteredReviews = filteredReviews?.sort(sorter);

      setData({
        users: sortedFilteredUsers,
        movies: sortedFilteredMovies,
        reviews: sortedFilteredReviews,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleRate = (mid:String) => {
    if(!user){
      toast.error("Please login to rate");
      navigate("/login");
    } else if(user.role != 'user'){
      toast.error("Only users can rate movies");
      navigate("/");
    } else{
      navigate("/rate/" + mid);
    }
  }

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <Container>
      <div className="flex justify-between">
        <h1 className="wd-heading">FEED</h1>
        {user && user.role === "blogger" && (
          <Link to={"/post"} className="wd-button flex gap-2 items-center">
            Post <FaPen />
          </Link>
        )}
      </div>

      {loading && (
        <div className="min-h-full w-full flex justify-center items-center">
          <FaSpinner className="animate-spin w-100 h-100 mt-2" />
        </div>
      )}
      {data && (
        <>
          <div className="flex flex-col my-2 gap-2">
            {data.reviews &&
            data.reviews?.map((r:any) => (
              <UserReview rating={r} movie={r.movieId?.title}/>
            ))}
            {data.movies &&
              data.movies?.map((m: any) => (
                <MoviePosted m={m} isBlogger={false} handleRate={()=>handleRate(m._id)}/>
              ))}
            {data.users &&
              data.users?.map((u: any) => <UserJoined u={u} key={u._id} />)}
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
