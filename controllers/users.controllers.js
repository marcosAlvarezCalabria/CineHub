const mongoose = require("mongoose");
const User = require ("../models/user.model");


module.exports.create = (req, res, next) => {
    const userData = req.body
    User.create(userData)
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            if( error instanceof mongoose.Error.ValidationError) {
                res.status(401).json(error.error)
            } else {
                next(error)
            }
        })
}
