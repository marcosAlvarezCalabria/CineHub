const mongoose = require ("mongoose");
const { schema } = require("./movie.model");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        text: {
            type: String,
            required : "Text is required"
        },
        movie: {
            type:Schema.Types.ObjectId,
            ref: "Movie"
        },
        author: {
            type:Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model("Comment", schema);
module.exports = Comment;