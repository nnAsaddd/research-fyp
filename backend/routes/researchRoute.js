const express = require("express");
const router = express.Router();
const {
  getResearchPapers,
  getSingleResearchPaper,
  createResearchPaper,
  deleteResearchPaper,
  updateResearchPaper,
  getCollectionResearchPaper,
} = require("../controllers/researchPaperController");
const multer = require("multer");
const verifyJwt = require("../middleware/verifyJwt");
router.use(verifyJwt);
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
router
  .get("/", getResearchPapers)
  .get("/getSingleResearchPaper/:id", getSingleResearchPaper)
  .post("/", upload.single("pdf"), createResearchPaper)
  .post("/collectionResearchPapers", getCollectionResearchPaper)
  .delete("/:researchPaperId", deleteResearchPaper)
  .patch("/", updateResearchPaper);

module.exports = router;
