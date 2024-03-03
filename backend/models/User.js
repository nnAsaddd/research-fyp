const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            minLength: 3,
            required: [true, "Please Provide User Name"]
        },
        email : {
            type: String,
            required: [true, "Please Provide an Email"],
            validate : {
                validator : validator.isEmail,
                message : "Please Provide a valid Email",
            }
        },
        password : {
            type: String,
            required: [true, "Please Provide a Password"]
        }
    }
);

module.exports = mongoose.model("User", UserSchema);