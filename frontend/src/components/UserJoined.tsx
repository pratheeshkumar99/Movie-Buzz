import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function UserJoined({ u }: { u: any }) {
  const { user } = useContext(UserContext);
  const [followingList, setFollowingList] = useState<any>([]);
  const navigate = useNavigate();
  const getFollowingList = () => {
    axios
      .get("/following")
      .then((res) => {
        setFollowingList(res.data);
      })
      .catch((e) => {
        return true;
      });
  };
  console.log(followingList)
  const isFollowing = followingList?.some(
    (followedUser: any) => followedUser._id === u._id
  );

  const followUser = (userId: string) => {
    if (user === null) {
      toast.error("Please login to follow users");
      navigate("/login");
      return;
    }
      if (user.role === "admin") {
        toast.error("Unauthorized");
        return;
      }
    axios
      .post("/follow/" + userId)
      .then((res) => {
        getFollowingList();
      })
      .catch((e) => {
        return true;
      });
  };

  const unFollowUser = (userId: string) => {
    if (user === null) {
      toast.error("Please login to unfollow users");
      navigate("/login");
      return;
    }
    if(user.role === 'admin'){
      toast.error("Unauthorized");
      return;
    }
    axios
      .post("/unfollow/" + userId)
      .then((res) => {
        getFollowingList();
      })
      .catch((e) => {
        return true;
      });
  };

  useEffect(() => {
    getFollowingList();
  }, [user]);
  return (
    <div
      key={u.id}
      className="bg-background-primary/50 border-primary/5 rounded-md px-2 py-2 border-2 flex justify-between w-full items-center gap-4"
    >
      <div className="flex justify-between w-full gap-3 items-center">
        <Link to={"/profile/" + u._id} className="underline">{u.name}</Link>
        {!isFollowing ? (
          <button
            className="wd-button text-sm"
            onClick={() => followUser(u._id)}
          >
            Follow
          </button>
        ) : (
          <button
            className="wd-error-button text-sm"
            onClick={() => unFollowUser(u._id)}
          >
            Unfollow
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 italic">
        joined{" "}
        {Math.round(
          (new Date().getTime() - new Date(u.createdAt).getTime()) / 3600000
        )}{" "}
        hrs ago{" "}
      </p>
    </div>
  );
}
