require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
const {logger} = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const collectionRoutes = require("./routes/collectionRoute");
const researchPaperRoutes = require("./routes/researchRoute");
const commentRoutes = require("./routes/commentRoute");
const queryRoutes = require("./routes/queryRoute");
const corsOptions = require("./config/corsOptions");
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/files", express.static(path.join(__dirname, "/files")));
console.log(__dirname + "/files")
app.use("/", require("./routes/root"));
// auth routes
app.use("/auth", authRoutes);
//collection routes
app.use("/collections", collectionRoutes);
//research papers routes
app.use("/researchPapers", researchPaperRoutes);
// comment routes
app.use("/comments", commentRoutes);
// query routes
app.use("/query", queryRoutes);
app.all("*", (req, res)=>{
    res.status(404);
    if(req.accepts("html"))
    {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }else if(req.accepts("json"))
    {
        res.json({message: "404 not found"});
    }else
    {
        res.type("txt").send("404 not found");
    }
})

app.use(errorHandler);
// const start = async()=> {
//     try{
//         await mongoose
//             .connect(process.env.DATABASE_URL)
//             .then(() => {
//                 console.log("Connected to DB")
//             })
//             .catch(err => {
//                 console.log("Error while connecting to DB" + err)
//             });
//         app.listen(PORT, () => {
//             console.log("Server Running on port " + PORT);
//         })
//     }catch(err)
//     {
//         console.log("Error" + err);
//     }
// }
//
// start();
// Function to start the server
const start = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error while connecting to DB: " + err);
    }
};

// Check if the script is being run directly (not in a test environment)
if (require.main === module) {
    start().then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    }).catch(err => {
        console.log("Error starting server: " + err);
    });
}

// Export the app for testing purposes
module.exports = {app, start};
