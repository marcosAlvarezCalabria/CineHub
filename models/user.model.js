const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const schema = new Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },
        email: {
            type: String,
            required: "Email is required"
        },
        password: {
            type: String,
            require: "Password is required"
        },
        username: {
            type: String,
            required: "Username is required"
        },
        birthDate: {
            type: Date,
            required: true,
        },
        location : {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true
            },
        },
    },
    {
        timestamps: true,
        
        }
    
)



schema.pre("save", function(next) {
    if(this.isModified("password")){
        bcrypt.hash(this.password, 10)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next)
    } else {
        next()

    }
});
 
const User = mongoose.model("User", schema);
module.exports = User;


/*toJSON: {
            transform: (doc, ret) => {
                ret.id =ret._id;
                delete  ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;

            }*/