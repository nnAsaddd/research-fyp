const express = require("express");
const router = express.Router();
const {
  getAllCollections,
  getSingleCollection,
  getUserCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");
const verifyJwt = require("../middleware/verifyJwt");
router.use(verifyJwt);
router
  .get("/", getAllCollections)
  .get("/getSingleCollection/:id", getSingleCollection)
  .post("/userCollections", getUserCollections)
  .post("/", createCollection)
  .delete("/:id", deleteCollection)
  .patch("/", updateCollection);

module.exports = router;
