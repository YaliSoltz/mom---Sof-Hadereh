const { Reading, joiSchema } = require("../model/reading");
const cloudinary = require("../utils/cloudinary");

// get all the readings
const getAllReadings = async (req, res) => {
  const reading = await Reading.find();
  res.status(200).send(reading);
};

// add new reading
const addNewReading = async (req, res) => {
  const body = req.body;
  let { category, imgUrl } = body;

  try {
    const { public_id, secure_url } = await cloudinary.uploader.upload(imgUrl, {
      folder: "Readings",
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

  // define the new reading
  let reading = new Reading({
    category,
    imgUrl,
  });

  // add the reading to database
  try {
    reading = await reading.save();
    res.status(201).send(reading);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


// delete reading by id
const deleteReading = async (req, res) => {
  const id = req.params.id;
  try {
    await Reading.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllReadings,
  addNewReading,
  deleteReading,
};
