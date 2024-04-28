const express = require ("express");
const router = express.Router();
const movie = require("../controllers/movies.controller")
const user = require("../controllers/users.controllers");

/***************movies********* */
router.get("/movies", movie.list);
router.get("/detail/:id", movie.detail);

//*****************user******** */
router.post("/user", user.create);
router.get("/profile", user.profile);








module.exports = router;