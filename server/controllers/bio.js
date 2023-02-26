const { Bio, joiSchema } = require("../model/bio");
const cloudinary = require("../utils/cloudinary");

// get  bio
const getBio = async (req, res) => {
  const bio = await Bio.find();
  res.status(200).send(bio);
};

// add new bio
const addNewBio = async (req, res) => {
  const body = req.body;
  const { title, content, imgUrl } = body;
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(imgUrl, {
      folder: "Bio",
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

   // define the new bio
  let bio = new Bio({
    title,
    content,
    imgUrl,
  });

    // add the bio to database
  try {
    bio = await bio.save();
    res.status(201).send(bio);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// change bio
const changeBio = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { title, content, imgUrl } = body;

   // check if there are inserted values when update
  if (Object.keys(body).length === 0)
    return res.status(400).send("must contain value");


    // change the title/content/imgUrl at the user's choice
  try {
    const bio = await Bio.updateOne(
      { _id: id },
      { $set: { title, content, imgUrl } }
    );
    res.status(201).send(bio);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete bio by id
const deleteBio = async (req, res) => {
  const id = req.params.id;
  try {
    await Bio.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
   res.status(400).send(error.message)
  }
};

module.exports = {
  getBio,
  addNewBio,
  changeBio,
  deleteBio,
};
