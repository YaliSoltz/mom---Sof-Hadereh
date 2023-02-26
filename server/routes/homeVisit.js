const { Router } = require("express");
const {
  addNewHomeVisit,
  getAllHomeVisits,
  deleteHomeVisit,
  changeHomeVisit,
} = require("../controllers/homeVisit");
const router = Router();

// get all the home visits
router.get("/", getAllHomeVisits);

// add new home visit
router.post("/", addNewHomeVisit);

// change home visit
router.patch("/:id", changeHomeVisit);

// delete home visit by id
router.delete("/:id", deleteHomeVisit);

module.exports = router;
