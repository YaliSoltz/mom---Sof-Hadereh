const { Lecture, joiSchema } = require("../model/lecture");
const cloudinary = require("../utils/cloudinary");

// get all the lectures
const getAllLectures = async (req, res) => {
  const lectures = await Lecture.find();
  res.status(200).send(lectures);
};

// add new lecture
const addNewLecture = async (req, res) => {
  const body = req.body;
 let { title, content, imgUrl } = body;
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(imgUrl, {
      folder: "Lectures",
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

  // define the new lecture
  let lecture = new Lecture({
    title,
    content,
    imgUrl,
  });

  // add the lecture to database
  try {
    lecture = await lecture.save();
    res.status(201).send(lecture);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// change lecture
const changeLecture = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { title, content, imgUrl } = body;

  // check if there are inserted values when update
  if (Object.keys(body).length === 0)
    return res.status(400).send("must contain value");

  // change the title/content/imgUrl at the user's choice
  try {
    const lecture = await Lecture.updateOne(
      { _id: id },
      { $set: { title, content, imgUrl } }
    );
    res.status(201).send(lecture);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete lecture by id
const deleteLecture = async (req, res) => {
  const id = req.params.id;
  try {
    await Lecture.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
   res.status(400).send(error.message)
  }
};

module.exports = {
  getAllLectures,
  addNewLecture,
  changeLecture,
  deleteLecture,
};
