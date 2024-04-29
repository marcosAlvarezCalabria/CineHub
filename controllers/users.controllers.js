const mongoose = require("mongoose");
const User = require ("../models/user.model");
const jwt = require("jsonwebtoken")



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


module.exports.login = (req, res, next) => {
    
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                user.checkPassword(req.body.password)
                    .then((match) => {
                        if(match){
                            const accessToken = jwt.sign({ sub: user.id, exp: Date.now()/1000+100}, process.env.JWT_SECRET);   
                            res.json({accessToken})

                        } else {
                            res.status(401).json({message: "Invalids credentials"})
                        }
                    })
                    .catch(next)
                
            } else {
                res.status(401).json({message: "Invalids credentials"})

            }
        })
        .catch()

}




module.exports.profile = (req, res) => {
    console.log(req.user)
    res.json(req.user);
  };