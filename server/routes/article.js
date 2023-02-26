const { Router } = require("express");
const {
  addNewArticle,
  getAllArticles,
  deleteArticle,
  changeArticle,
} = require("../controllers/article");
const router = Router();

// get all the articles
router.get("/", getAllArticles);

// add new article
router.post("/", addNewArticle);

// change article
router.patch("/:id", changeArticle);

// delete article by id
router.delete("/:id", deleteArticle);

module.exports = router;
