const express = require('express');
const cors = require('cors');
const {  userRoute } = require('./routes/userRoutes.js');
const { connectDB } = require('./db.js');
const cookieParser = require('cookie-parser');
const { bloggerRoute } = require('./routes/bloggerRoutes.js');
const { movieRoute } = require('./routes/movieRoutes.js');
const { reviewRoute } = require('./routes/reviewRoutes.js');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

connectDB();

userRoute(app);
bloggerRoute(app);
movieRoute(app);
reviewRoute(app);


app.listen(process.env.PORT || 4000 , () => {
    console.log("Server running on port 4000");
})