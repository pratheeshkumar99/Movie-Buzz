import React, { useContext, useState } from "react";
import Container from "../../components/Container";
import { UserContext } from "../../context/userContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Rate = () => {
    const {user} = useContext(UserContext);
    const {mid} = useParams();
    const navigate = useNavigate();
    
    const [ratingData , setRatingData] = useState({
        rating : 1,
        comment : ""
    });

    const handleRate = (e:any) => {
        e.preventDefault();
        axios.post("/rate/" + mid , ratingData ).then((res)=>{
            toast.success("Rated successfully");
            navigate("/profile"); 
        }).catch(err => {
            toast.error("Internal Server error");
        })
    }
  return (
    <Container>
      <h1 className="wd-heading">RATE</h1>
      <form onSubmit={handleRate} action="">
        <div className="mt-4">
          <label htmlFor="rating">Rating {ratingData.rating}</label>
          <input
            type="range"
            className="wd-input"
            id="rating"
            onChange={(e) =>
              setRatingData({ ...ratingData, rating: parseInt(e.target.value) })
            }
            min={1}
            max={5}
            value={ratingData.rating}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            className="wd-input"
            rows={5}
            onChange={(e) =>
              setRatingData({ ...ratingData, comment: e.target.value })
            }
            value={ratingData.comment}
            placeholder="Give your thoughts"
          />
        </div>
        <button className="wd-button">Rate</button>
      </form>
    </Container>
  );
};

export default Rate;
