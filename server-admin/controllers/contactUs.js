const { ContactUs, joiSchema } = require("../model/contactUs");

// get all the contactUs
const getAllContactUs = async (req, res) => {
  const contactUs = await ContactUs.find();
  res.status(200).send(contactUs);
};

// add new contactUs
const addNewContactUs = async (req, res) => {
  const body = req.body;
  const {name, phoneNumber, email, subject, content } = body

  //joi validation
  const { error } = joiSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  // define the new contactUs
  let contactUs = new ContactUs({
    name, phoneNumber, email, subject, content
  });

  // add the contactUs to database
  try {
    contactUs = await contactUs.save();
    res.status(201).send(contactUs);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete contactUs by id
const deleteContactUs = async (req, res) => {
  const id = req.params.id;
try {
    await ContactUs.findByIdAndDelete(id);
    res.status(201).send("deleted");
} catch (error) {
  res.status(400).send(error.message);
}
};

module.exports = {
  getAllContactUs,
  addNewContactUs,
  deleteContactUs,
};
