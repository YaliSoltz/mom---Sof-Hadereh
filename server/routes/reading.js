const { Router } = require("express");
const {
  addNewReading,
  getAllReadings,
  deleteReading,
} = require("../controllers/reading");
const router = Router();

// get all the readings
router.get("/", getAllReadings);

// add new reading
router.post("/", addNewReading);

// delete reading by id
router.delete("/:id", deleteReading);

module.exports = router;
