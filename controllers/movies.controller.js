const mongoose = require("mongoose");
const Movie = require ("../models/movie.model");



module.exports.create = (req, res, next) => {
    
}

module.exports.list = (req, res, next) => {
    Movie.find()
        .then((movies) => res.json(movies))
        .catch(next)
}