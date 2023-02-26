const { Article, joiSchema } = require("../model/article");
const cloudinary = require("../utils/cloudinary");

// get all the articles
const getAllArticles = async (req, res) => {
  const article = await Article.find();
  res.status(200).send(article);
};

// add new article
const addNewArticle = async (req, res) => {
  const body = req.body;
  let { title, content, imgUrl } = body;

  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(imgUrl, {
      folder: "Articles",
    });
    imgUrl = {
      public_id,
      url: secure_url,
    };
  } catch (error) {
    return res.status(400).send(error.message);
  }

  //joi validation
  const { error } = joiSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  // define the new article
  let article = new Article({
    title,
    content,
    imgUrl,
  });

  // add the article to database
  try {
  
    article = await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// change article
const changeArticle = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { title, content, imgUrl } = body;

  // check if there are inserted values when update
  if (Object.keys(body).length === 0)
    return res.status(400).send("must contain value");

  // change the title/content/imgUrl at the user's choice
  try {
    const article = await Article.updateOne(
      { _id: id },
      { $set: { title, content, imgUrl } }
    );
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete article by id
const deleteArticle = async (req, res) => {
  const id = req.params.id;
  try {
    await Article.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllArticles,
  addNewArticle,
  changeArticle,
  deleteArticle,
};
