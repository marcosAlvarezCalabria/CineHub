const express = require ("express");
const router = express.Router();
const movie = require("../controllers/movies.controller")
const user = require("../controllers/users.controllers");
const authMiddleware = require ("../middlewares/auth.middleware.js")

/***************movies********* */
router.get("/movies", authMiddleware.checkAuth, movie.list);
router.get("/detail/:id", movie.detail);

//*****************user******** */
router.post("/user", user.create);
router.get("/profile", user.profile);
router.post("/login", user.login)








module.exports = router;