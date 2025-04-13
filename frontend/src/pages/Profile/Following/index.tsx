import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import { UserJoined } from "../../../components/UserJoined";
import { FaSpinner } from "react-icons/fa";

const FollowingList = () => {
  const [followingList, setFollowingList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFollowingList = () => {
    axios
      .get("/following")
      .then((res) => {
        setFollowingList(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }

  useEffect(()=> {
    getFollowingList();
  } , [])

  return (
    <Container>
      <h1 className="wd-heading mb-4">Following</h1>
      {loading && (
        <div className="min-h-full w-full flex justify-center items-center">
          <FaSpinner className="animate-spin w-100 h-100 mt-2" />
        </div>
      )}
      <div className="w-full flex justify-center">
        {!loading && followingList.length === 0 && (
          <p className="md:text-3xl text-2xl">You aren't following anyone</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {followingList?.map((user: any) => {
          return <UserJoined u={user} key={user._id} />;
        })}
      </div>
    </Container>
  );
};

export default FollowingList;
