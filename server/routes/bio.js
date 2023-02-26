const { Router } = require("express");
const {
  addNewBio,
  getBio,
  deleteBio,
  changeBio,
} = require("../controllers/bio");
const router = Router();

// get bio
router.get("/", getBio);

// add new bio
router.post("/", addNewBio);

// change bio
router.patch("/:id", changeBio);

// delete bio by id
router.delete("/:id", deleteBio);

module.exports = router;
