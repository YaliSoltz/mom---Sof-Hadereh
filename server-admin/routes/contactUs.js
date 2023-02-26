const { Router } = require("express");
const {
  getAllContactUs,
  addNewContactUs,
  deleteContactUs,
} = require("../controllers/contactUs");
const router = Router();

// get all the contactUs
router.get("/", getAllContactUs);

// add new contactUs
router.post("/", addNewContactUs);

// delete contactUs by id
router.delete("/:id", deleteContactUs);

module.exports = router;
