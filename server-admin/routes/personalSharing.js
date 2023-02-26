const { Router } = require("express");
const {
  getAllPersonalSharing,
  addNewPersonalSharing,
  deletePersonalSharing,
} = require("../controllers/personalSharing");
const router = Router();

// get all the personalSharing
router.get("/", getAllPersonalSharing);

// add new personalSharing
router.post("/", addNewPersonalSharing);

// delete personalSharing by id
router.delete("/:id", deletePersonalSharing);

module.exports = router;
