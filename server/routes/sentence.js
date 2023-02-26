const { Router } = require("express");
const {
  addNewSentence,
  getAllSentences,
  deleteSentence,
  changeSentence,
} = require("../controllers/sentence");
const router = Router();

// get all the sentences
router.get("/", getAllSentences);

// add new sentence
router.post("/", addNewSentence);

// change sentence
router.patch("/:id", changeSentence);

// delete sentence by id
router.delete("/:id", deleteSentence);

module.exports = router;
