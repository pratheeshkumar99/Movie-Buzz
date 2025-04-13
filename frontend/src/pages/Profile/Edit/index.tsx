import React, { useContext, useEffect, useState } from "react";
import Container from "../../../components/Container";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
  });

  const handleEdit = (e: any) => {
    e.preventDefault();
    try {
      axios.put("/user/" + user._id, formData).then((res) => {
        toast.success("Profile Updated Successfully");
        navigate("/profile");
      });
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <Container>
      <h1 className="wd-heading">Edit Profile</h1>
      <form onSubmit={handleEdit} className="w-full flex flex-col gap-3 mt-4" action="">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            id="name"
            className="wd-input w-full"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            id="email"
            className="wd-input w-full"
          />
        </div>
        <div className="flex flex-row gap-2">
          <button className="wd-button">Save</button>
          <Link to={"/profile"} className="wd-error-button">
            Cancel
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default ProfileEdit;
