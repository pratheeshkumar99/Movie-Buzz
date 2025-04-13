import React from "react";
import { ActorPills } from "./ActorPills";
import { Link } from "react-router-dom";

const MoviePosted = ({ m, handleRate , isBlogger }: { m: any; handleRate: any , isBlogger : boolean }) => {
  return (
    <div
      className="bg-background-primary/50 border-primary/5 rounded-md px-2 py-2 border-2"
      key={m._id}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl">
          {m.title}
          <span className="text-sm ml-3">Directed By - {m.director}</span>
        </h1>
        <p className="text-sm text-gray-500 italic">
          posted{" "}
          {Math.round(
            (new Date().getTime() - new Date(m.createdAt).getTime()) / 3600000
          )}{" "}
          hrs ago{" "}
        </p>
      </div>
      <p className="text-sm text-gray-400 mt-2">{m.description}</p>
      <div className="flex my-3 flex-wrap gap-2">
        {m.actors &&
          m.actors.map((actor: string) => (
            <ActorPills actor={actor} key={actor} />
          ))}
      </div>
      <hr className="border-t-2 my-2 border-primary/10 " />
      <div className="flex justify-between w-full">
        {!isBlogger && <button onClick={handleRate} className="wd-button text-sm">
          Rate It
        </button>}
        {m.ratings.length > 0 && <Link to={"/reviews/" + m._id } className="text-sm text-gray-500 italic hover:underline">{m.ratings.length} reviews</Link>}
      </div>
    </div>
  );
};

export default MoviePosted;
