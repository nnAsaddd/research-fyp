const express = require("express");
const {
    getQueries,
    createQuery,
    deleteQuery,
    getUserQueries
} = require("../controllers/queryController");
const router = express.Router();
const verifyJwt = require("../middleware/verifyJwt");
router.use(verifyJwt);
router
    .get("/", getQueries)
    .post("/", createQuery)
    .post("/userQuery", getUserQueries)
    .delete("/:queryId", deleteQuery);

module.exports = router;
