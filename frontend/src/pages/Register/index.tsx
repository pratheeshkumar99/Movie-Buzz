import React, { useState } from "react";
import Container from "../../components/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const onRegister = (e:any) => {
    e.preventDefault();
    axios
      .post("/register", formData)
      .then((res) => {
        toast.success("User registered successfully");
        navigate("/login");
      })
      .catch((error) => {
        if(error.response.status === 400){
        toast.error("User already exists");
        } 
        else{
          toast.error("Internal server error");
        }
      });
  };

  return (
    <Container>
      <h1 className="text-primary text-3xl font-heading">REGISTER</h1>
      <form onSubmit={onRegister} action="" autoComplete="off">
        <div className="mt-4 flex flex-col justify-evenly gap-4">
          <label htmlFor="name">Name</label>
          <input
            className="wd-input"
            id="name"
            type="text"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className="wd-input"
            id="email"
            type="email"
            value={formData?.email}
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
            value={formData?.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            placeholder="Enter your password"
            required
          />
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="wd-input"
          >
            <option value={"user"}>User</option>
            <option value={"blogger"}>Blogger</option>
            <option value={"admin"}>Admin</option>
          </select>
          <p>
            Already an user !{" "}
            <Link to={"/login"} className="text-primary/50">
              {" "}
              Login here
            </Link>
          </p>
          <button className="wd-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Register;
