const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
    {
        text:{
            type: String
        },
        timeStamp:{
            type: String
        },
        userId:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }
)

module.exports = mongoose.model("Query",querySchema);