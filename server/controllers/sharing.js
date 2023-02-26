const { Sharing, joiSchema } = require("../model/sharing");

// get all the sharings
const getAllSharings = async (req, res) => {
  const sharing = await Sharing.find();
  res.status(200).send(sharing);
};

// add new sharing
const addNewSharing = async (req, res) => {
  const body = req.body;
  const { name = 'אלמוני/ת', age, status, content } = body;

  //joi validation
  const { error } = joiSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  // define the new sharing
  let sharing = new Sharing({
    name,
    age,
    status,
    content,
  });

  // add the sharing to database
  try {
    sharing = await sharing.save();
    res.status(201).send(sharing);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// change sharing
const changeSharing = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { name, age, status, content } = body;

  // check if there are inserted values when update
  if (Object.keys(body).length === 0)
    return res.status(400).send("must contain value");

  // change the name/age/status/content at the user's choice
  try {
    const sharing = await Sharing.updateOne(
      { _id: id },
      { $set: { name, age, status, content } }
    );
    res.status(201).send(sharing);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete sharing by id
const deleteSharing = async (req, res) => {
  const id = req.params.id;
  try {
    await Sharing.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllSharings,
  addNewSharing,
  changeSharing,
  deleteSharing,
};
