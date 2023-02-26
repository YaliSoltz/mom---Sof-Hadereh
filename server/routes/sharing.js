const { Router } = require("express");
const {
  addNewSharing,
  getAllSharings,
  deleteSharing,
  changeSharing,
} = require("../controllers/sharing");
const router = Router();

// get all the sharings
router.get("/", getAllSharings);

// add new sharing
router.post("/", addNewSharing);

// change sharing
router.patch("/:id", changeSharing);

// delete sharing by id
router.delete("/:id", deleteSharing);

module.exports = router;
