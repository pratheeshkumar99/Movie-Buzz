const {db} = require("../db");
const isAuthenticated = require("../middlewares/isAuthenticated");

const Review = require("../models/Review");

const reviewRoute = (app) => {
    app.post("/api/rate/:mid", isAuthenticated, async (req, res) => {
        const { _id, role } = req.user;
        if (role != "user") {
            return res.sendStatus(400);
        }
        const { rating, comment } = req.body;
        const { mid } = req.params;
        console.log(_id, rating, comment, mid);

        try {
            const review = await Review.create({
                movieId: mid, userId: _id, rating, comment
            })

            await Movie.findByIdAndUpdate(mid, { $push: { ratings: review._id } })
            return res.status(200).send(review);
        } catch (e) {
            return res.status(500).send({ m: "Internal Server Error", error: e.message });
        }

    })

    app.get("/api/reviews", async(req,res)=>{
        try{
            const reviews = await Review.find().populate("movieId").populate("userId").exec();
            return res.status(200).send(reviews);
        } catch(e){
            return res.status(500).send({ m : "Internal Server Error" , error : e.message});
        }
    })
}

module.exports = { reviewRoute };