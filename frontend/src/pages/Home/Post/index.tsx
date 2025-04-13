import React, { useState } from "react";
import Container from "../../../components/Container";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ActorPills } from "../../../components/ActorPills";

const Post = () => {
    const navigate = useNavigate();
  const [currentActor, setCurrentActor] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    genre: "action",
    description : "",
    actors: [],
    director: "",
  } as any);

  const handlePost = async (e:any) => {
    e.preventDefault();
    try{
        const response = await axios.post("/blogger/post" , formData);
        toast.success("Posted");
        navigate("/");
    } catch(err){
        toast.error("Failed to post");
    }
  }

  const addActor = () => {
    if (currentActor === "") return;
    if(formData.actors.includes(currentActor)){
        toast.error("Actor already added");
        return;
    };
    setFormData({...formData , actors : [...formData.actors , currentActor]});
    setCurrentActor("");
  };

  return (
    <Container>
      <h1 className="wd-heading">Post</h1>
      <form onSubmit={handlePost} action="" className="flex flex-col gap-4 mt-4">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e)=> setFormData({...formData , title:e.target.value})}
            placeholder="Jurassic Park"
            className="wd-input"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            value={formData.description}
            onChange={(e)=> setFormData({...formData , description:e.target.value})}
            placeholder="Describe the movie"
            className="wd-input"
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <select value={formData.genre} onChange={(e)=>setFormData({...formData, genre : e.target.value})} id="genre" className="wd-input">
            <option value={"action"}>Action</option>
            <option value={"drama"}>Drama</option>
            <option value={"comedy"}>Comedy</option>
            <option value={"romance"}>Romance</option>
            <option value={"cartoon"}>Cartoon</option>
          </select>
        </div>
        <div>
          <label htmlFor="actors">Actors</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="wd-input"
              value={currentActor}
              onChange={(e) => setCurrentActor(e.target.value)}
              id="actors"
              placeholder="Jacky Chan"
            />
            <button type="button" onClick={addActor} className="wd-success-button ">
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-row mt-2 flex-wrap gap-2">
            {formData.actors.length !== 0 &&
              formData.actors.map((actor:string) => (
                <ActorPills actor={actor} key={actor}/>
              ))}
          </div>
        </div>
        <div>
          <label htmlFor="director">Directors</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.director}
              onChange={(e)=>setFormData({...formData, director:e.target.value})}
              className="wd-input"
              id="director"
              placeholder="Christopher Nolan"
              required
            />
          </div>
        </div>
        <button className="wd-button">Post</button>
      </form>
    </Container>
  );


};

export default Post;
