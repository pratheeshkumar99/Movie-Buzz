import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [searchTitle, setSearchTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("/logout").then(() => {
      toast.success("Logged out successfully");
      setUser(null);
      setIsOpen(false);
      navigate("/login");
    });
  };

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login");
  }

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/profile");
  }

  return (
    <nav className="w-full h-20 bg-background-primary fixed top-0 gap-3 left-0 flex flex-row items-center justify-between z-10 md:px-32 lg:px-64 px-3">
      <Link to={"/"} className="md:flex hidden text-white font-heading text-xl">
        MovieBuzz
      </Link>
      <Link to={"/"} className="md:hidden text-white font-heading text-xl">
        MB
      </Link>
      <div className="md:w-1/2 w-full flex gap-2">
        <input
          className="wd-input"
          type="search"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search movies by title"
        />
        <Link
          to={"/search?title=" + searchTitle}
          className={`rounded-md p-2 bg-background-secondary text-primary ${
            searchTitle.length <= 0 && "cursor-not-allowed text-opacity-30 "
          } transition-all`}
        >
          <FaSearch />
        </Link>
      </div>
      <div className="md:flex hidden gap-2 items-center">
        {user ? (
          <button
            onClick={handleLogout}
            className="wd-button flex items-center gap-2"
          >
            Logout <IoMdLogOut />
          </button>
        ) : (
          <Link to={"/login"} className="wd-button">
            Login
          </Link>
        )}
        {user && (
          <Link to={"/profile"} className="wd-button flex items-center gap-2">
            Profile <FaUserCircle />
          </Link>
        )}
      </div>
      <div className="md:hidden flex">
        <button className="wd-button" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-20 right-0 px-2 bg-background-primary w-full flex flex-row gap-2 items-end py-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="wd-button flex items-center gap-2"
            >
              Logout <IoMdLogOut />
            </button>
          ) : (
            <button onClick={handleLogin} className="wd-button">
              Login
            </button>
          )}
          {user && (
            <button onClick={handleProfile} className="wd-button flex items-center gap-2">
              Profile <FaUserCircle />
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
