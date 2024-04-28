const express = require ("express");
const router = express.Router();
const movies = require("../controllers/movies.controller")


router.get("/movies", movies.list);
router.get("/detail/:id", movies.detail);

module.exports = router;