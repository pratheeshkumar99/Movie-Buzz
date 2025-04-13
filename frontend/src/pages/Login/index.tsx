import React, { useContext, useState } from "react";
import Container from "../../components/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {user , setUser} = useContext(UserContext);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const onLogin = (e: any) => {
    e.preventDefault();
    axios
      .post("/login" , formData)
      .then((res) => {
        toast.success("Logged in successfully");
        setUser(res.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 404) {
          toast.error("Invalid credentials");
        } else {
          toast.error("Internal server error");
        }
      });
  };

  return (
    <Container>
      <h1 className="wd-heading">LOGIN</h1>
      <form onSubmit={onLogin} action="" autoComplete="off">
        <div className="mt-4 flex flex-col justify-evenly gap-4">
          <label htmlFor="email">Email</label>
          <input
            className="wd-input"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="jd@mail.com"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="wd-input"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter your password"
            required
          />

          <p>
            Not an user !{" "}
            <Link to={"/register"} className="text-primary/50">
              {" "}
              Register here
            </Link>
          </p>
          <button className="wd-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
