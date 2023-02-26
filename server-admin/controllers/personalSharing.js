const { PersonalSharing, joiSchema } = require("../model/personalSharing");

// get all the personalSharings
const getAllPersonalSharing = async (req, res) => {
  const personalSharing = await PersonalSharing.find();
  res.status(200).send(personalSharing);
};

// add new personalSharing
const addNewPersonalSharing = async (req, res) => {
  const body = req.body;
  const { name = 'אלמוני/ת', age, status, content } = body;
  
  //joi validation
  const { error } = joiSchema.validate(body);
  if (error) return res.status(400).send(error.message);
  
  
  // define the new personalSharing
  let personalSharing = new PersonalSharing({
    name,
    age,
    status,
    content,
  });

  // add the personalSharing to database
  try {
    personalSharing = await personalSharing.save();
    res.status(201).send(personalSharing);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete personalSharing by id
const deletePersonalSharing = async (req, res) => {
  const id = req.params.id;
try {
    await PersonalSharing.findByIdAndDelete(id);
    res.status(201).send("deleted");
} catch (error) {
  res.status(400).send(error.message);
}
};

module.exports = {
  getAllPersonalSharing,
  addNewPersonalSharing,
  deletePersonalSharing,
};
