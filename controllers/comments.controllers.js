const Comment = require("../models/comment.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => {
    Comment.create({ ...req.body, movie: req.params.id })
        .then((comment) => {
            res.json(comment)
        })
        .catch((err) => {
            if (err instanceof mongoose.ValidationError) {
                res.status(400).json(err.errors)
            } else {
                next(err)
            }
        })

}