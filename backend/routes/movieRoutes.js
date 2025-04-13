const { db } = require('../db');
const isBlogger = require('../middlewares/isBlogger');
const Movie = require('../models/Movie');
const { populate } = require('../models/User');

const movieRoute = (app) => {
    app.get("/api/movies", async (req, res) => {
        try {
            const movies = await Movie.find({});
            return res.status(200).send(movies);
        } catch (e) {
            return res.status(500).send({ message: "Internal Server Error", error: e.message });
        }
    })

    app.get("/api/movies/:id" , async (req,res)=>{
        try{
            const {id} = req.params;
            const movie = await Movie.findById(id).populate("ratings").populate({
                path : 'ratings',
                populate : {
                    path : 'userId'
                }
            }).exec();
            return res.status(200).send(movie);
        }catch(e){
            return res.status(500).send({message : "Internal Server Error" , error : e.message});
        }
    })


}

module.exports = { movieRoute };