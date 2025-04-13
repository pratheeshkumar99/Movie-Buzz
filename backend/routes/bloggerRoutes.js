const { db } = require('../db');
const isBlogger = require('../middlewares/isBlogger');
const Movie = require('../models/Movie');


const bloggerRoute = (app) => {

    app.post("/api/blogger/post", isBlogger, async (req, res) => {
        const { _id } = req.user;
        const { title, description, genre, director, actors } = req.body;
        console.log(_id, req.body);
        try {
            await Movie.create({
                userId: _id,
                title, description, genre, director, actors
            })
            return res.status(200).send("Movie created successfully");
        } catch (err) {
            return res.status(500).send({message : "Internal Server Error"  , error : err.message});
        }
    })



}

module.exports = { bloggerRoute };