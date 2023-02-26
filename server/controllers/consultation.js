const { Consultation, joiSchema } = require("../model/consultation");
const cloudinary = require("../utils/cloudinary");

// get all the consultations
const getAllConsultations = async (req, res) => {
  const consultations = await Consultation.find();
  res.status(200).send(consultations);
};

// add new consultation
const addNewConsultation = async (req, res) => {
  const body = req.body;
  const { title, content, imgUrl } = body;
  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(imgUrl, {
      folder: "Consultations",
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

  // define the new consultation
  let consultation = new Consultation({
    title,
    content,
    imgUrl,
  });

  // add the consultation to database
  try {
    consultation = await consultation.save();
    res.status(201).send(consultation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// change consultation
const changeConsultation = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { title, content, imgUrl } = body;

  // check if there are inserted values when update
  if (Object.keys(body).length === 0)
    return res.status(400).send("must contain value");

  // change the title/content/imgUrl at the user's choice
  try {
    const consultation = await Consultation.updateOne(
      { _id: id },
      { $set: { title, content, imgUrl } }
    );
    res.status(201).send(consultation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete consultation by id
const deleteConsultation = async (req, res) => {
  const id = req.params.id;
  try {
    await Consultation.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
   res.status(400).send(error.message)
  }
};

module.exports = {
  getAllConsultations,
  addNewConsultation,
  changeConsultation,
  deleteConsultation,
};
