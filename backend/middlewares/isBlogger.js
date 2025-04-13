const isAuthenticated = require("./isAuthenticated")

const isBlogger = (req, res, next) => {

    isAuthenticated(req, res, () => {
        const { role } = req.user;
        if (role === 'blogger') {
            next();
        } else {
            return res.status(403).send("Forbidden");
        }
    });
    
}

module.exports = isBlogger;