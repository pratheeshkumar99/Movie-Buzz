const { db } = require("../db");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);

const userRoute = async (app) => {
    app.post("/api/register", async (req, res) => {
        const { name, email, password, role } = await req.body;
        const user = await User.findOne({ email });
        if (user != null) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        try {
            await User.create({ name, email, password: hashedPassword, role });
            return res.status(200).send("User registered successfully");
        } catch (err) {
            return res.status(500).send({ error: "Error registering user", message: err.message });
        }
    })

    app.post("/api/login", async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User doesn't exists");
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send("Invalid password");
        }
        const userDoc = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        jwt.sign(userDoc, process.env.SECRET_KEY, {}, (err, token) => {
            if (err) {
                return res.status(500).send({ message: "Internal Server error", error: err.message });
            }
            const cookieOptions = {
                httpOnly: true,
                secure: true,
                maxAge: 10 * 60 * 60 * 1000,
                sameSite: "None",
            };
            return res.cookie("token", token , cookieOptions).send(userDoc);
        })
    })

    app.get("/api/user", async (req, res) => {
        const { token } = req.cookies;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return null;
                }
                const { name, email, role, _id } = await User.findById(decoded.id);
                return res.status(200).send({ name, email, role, _id });
            });
        } else{
            return res.send(null);
        }
    })

    app.post("/api/logout", (req, res) => {
        return res.clearCookie("token").send("Logged out successfully");
    })


    app.get("/api/profile", isAuthenticated, async (req, res) => {
        const { _id } = req.user;
        const user = await User.findOne({ _id });
        const movies = await Movie.find({ userId: user._id });
        const reviews = await Review.find({ userId: user._id }).populate("movieId").exec();
        return res.status(200).send({ user, movies, reviews });
    })

    app.get("/api/users", async (req, res) => {
        const users = await User.find({
            role: { $ne: "admin" }
        });
        return res.status(200).send(users);
    });

    app.get("/api/user/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            const movies = await Movie.find({ userId: id });
            const reviews = await Review.find({ userId: id }).populate("movieId").exec();
            return res.status(200).send({ user, movies, reviews });
        } catch (e) {
            return res.status(500).send({ m: "Internal Server Error", error: e.message });
        }
    })

    app.put("/api/user/:id", async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const user = await User.findByIdAndUpdate({
                _id: id
            }, {
                name, email
            });

            return res.status(200).send(user);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    })

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

    app.post("/api/follow/:id", isAuthenticated, async (req, res) => {
        const { id } = req.params;
        const { _id } = req.user;
        try {
            const user = await User.findByIdAndUpdate(_id, { $push: { following: id } });
            const followingUser = await User.findByIdAndUpdate(id, { $push: { followers: _id } });
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send({ m: "Internal Server Error", error: e.message });
        }
    })

    app.post("/api/unfollow/:id", isAuthenticated, async (req, res) => {
        const { id } = req.params;
        const { _id } = req.user;
        try {
            const user = await User.findByIdAndUpdate(_id, { $pull: { following: id } });
            const followingUser = await User.findByIdAndUpdate(id, { $pull: { followers: _id } });
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send({ m: "Internal Server Error", error: e.message });
        }
    })

    app.get("/api/followers/", isAuthenticated, async (req, res) => {
        const { _id } = req.user;
        try {
            const user = await User.findById(_id).populate("followers").exec();
            return res.status(200).send(user.followers);
        } catch (e) {
            return res.status(500).send({ m: "Internal Server Error", error: e.message });
        }
    })

    app.get("/api/following/", isAuthenticated, async (req, res) => {
        const { _id } = req.user;
        try {
            const user = await User.findById(_id).populate("following").exec();
            return res.status(200).send(user.following);
        } catch (e) {
            return res.status(500).send({ m: "Internal Server Error", error: e.message });
        }
    })

    app.get("/api/users", isAdmin, async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(500).send({ m: "Internal Server Error", error: error.message });
        }
    })

    app.delete("/api/user/:id", isAdmin, async (req, res) => {
        const { id } = req.params;
        try {
            const movies = await Movie.find({ userId: id });
            for (const movie of movies) {
                await Review.deleteMany({ movieId: movie._id });
            }
            await Movie.deleteMany({ userId: id });
            await Review.deleteMany({ userId: id });
            await User.updateMany(
                { following: id },
                { $pull: { following: id } }
            );
            await User.updateMany(
                { followers: id },
                { $pull: { followers: id } }
            );
            await User.findByIdAndDelete(id);
            return res.status(200).send("User deleted successfully");
        } catch (error) {
            return res.status(500).send({ m: "Internal Server Error", error: error.message });
        }
    })

}

module.exports = { userRoute };

