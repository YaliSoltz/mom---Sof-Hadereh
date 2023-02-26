const { Router } = require("express");
const { addNewUser, getAllUsers, deleteUser } = require("../controllers/user");
const router = Router();

// get all the users
router.get("/", getAllUsers);

// add new user
router.post("/", addNewUser);

// delete user by id
router.delete("/:id", deleteUser);

module.exports = router;
