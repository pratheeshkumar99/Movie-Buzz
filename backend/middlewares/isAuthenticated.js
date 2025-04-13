const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = (req,res,next) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(404).send("Invalid token");
            }
            const user = await User.findById(decoded.id);
            req.user = user;
            next();
        });
    } else {
        return res.status(401).send("Unauthorized");
    }
}

module.exports =  isAuthenticated;