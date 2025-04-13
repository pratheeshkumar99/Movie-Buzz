const isAuthenticated = require("./isAuthenticated")

const isAdmin = (req, res, next) => {

    isAuthenticated(req, res, () => {
        const { role } = req.user;
        if (role === 'admin') {
            next();
        } else {
            return res.status(403).send("Forbidden");
        }
    });

}

module.exports = isAdmin;