import React, { useEffect, useState } from 'react'
import Container from '../../../components/Container';
import { UserJoined } from '../../../components/UserJoined';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const Followers = () => {
  const [followerList, setFollowerList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFollowerList = () => {
    axios
      .get("/followers")
      .then((res) => {
        setFollowerList(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFollowerList();
  }, []);

  return (
    <Container>
      <h1 className="wd-heading mb-4">Following</h1>
      {loading && (
        <div className="min-h-full w-full flex justify-center items-center">
          <FaSpinner className="animate-spin w-100 h-100 mt-2" />
        </div>
      )}
      <div className="w-full flex justify-center">
        {!loading && followerList.length === 0 && (
          <p className="md:text-3xl text-2xl">You have no followers</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {followerList?.map((user: any) => {
          return <UserJoined u={user} key={user._id} />;
        })}
      </div>
    </Container>
  );
}

export default Followers
