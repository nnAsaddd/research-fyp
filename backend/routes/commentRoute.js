const express = require("express");
const {
  getComments,
  getSingleComment,
  createComment,
  getResearchPaperComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const router = express.Router();
const verifyJwt = require("../middleware/verifyJwt");
router.use(verifyJwt);
router
  .get("/", getComments)
  .get("/:commentId", getSingleComment)
  .post("/", createComment)
  .post("/researchPaperComments", getResearchPaperComments)
  .patch("/", updateComment)
  .delete("/:commentId", deleteComment);

module.exports = router;
