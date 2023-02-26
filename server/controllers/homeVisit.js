const { HomeVisit, joiSchema } = require("../model/homeVisit");
const cloudinary = require("../utils/cloudinary");

// get all the homeVisits
const getAllHomeVisits = async (req, res) => {
  const homeVisit = await HomeVisit.find();
  res.status(200).send(homeVisit);
};

// add new homeVisit
const addNewHomeVisit = async (req, res) => {
  const body = req.body;
  const { title, content, imgUrl } = body;

  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(imgUrl, {
      folder: "HomeVisits",
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

  // define the new homeVisit
  let homeVisithomeVisit = new HomeVisit({
    title,
    content,
    imgUrl,
  });

  // add the homeVisit to database
  try {
    homeVisithomeVisit = await homeVisithomeVisit.save();
    res.status(201).send(homeVisithomeVisit);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// change homeVisit
const changeHomeVisit = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { title, content, imgUrl } = body;

  // check if there are inserted values when update
  if (Object.keys(body).length === 0)
    return res.status(400).send("must contain value");

  // change the title/content/imgUrl at the user's choice
  try {
    const homeVisit = await HomeVisit.updateOne(
      { _id: id },
      { $set: { title, content, imgUrl } }
    );
    res.status(201).send(homeVisit);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete homeVisit by id
const deleteHomeVisit = async (req, res) => {
  const id = req.params.id;
  try {
    await HomeVisit.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
   res.status(400).send(error.message)
  }
};

module.exports = {
  getAllHomeVisits,
  addNewHomeVisit,
  changeHomeVisit,
  deleteHomeVisit,
};
