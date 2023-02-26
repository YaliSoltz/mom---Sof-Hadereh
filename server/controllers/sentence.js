const { Sentence, joiSchema } = require("../model/sentence");

// get all the sentences
const getAllSentences = async (req, res) => {
  const sentences = await Sentence.find();
  res.status(200).send(sentences);
};

// add new sentence
const addNewSentence = async (req, res) => {
  const body = req.body;
  const { content } = body;

  //joi validation
  const { error } = joiSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  // define the new sentence
  let sentence = new Sentence({
    content
  });

  // add the sentence to database
  try {
    sentence = await sentence.save();
    res.status(201).send(sentence);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// change sentence
const changeSentence = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { content } = body;

  // check if there are inserted values when update
  if (Object.keys(body).length === 0)
    return res.status(400).send("must contain value");

  // change the content at the user's choice
  try {
    const sentence = await Sentence.updateOne(
      { _id: id },
      { $set: { content } }
    );
    res.status(201).send(sentence);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete sentence by id
const deleteSentence = async (req, res) => {
  const id = req.params.id;
 try {
   await Sentence.findByIdAndDelete(id);
   res.status(201).send("deleted");
 } catch (error) {
  res.status(400).send(error.message)
 }
};

module.exports = {
  getAllSentences,
  addNewSentence,
  changeSentence,
  deleteSentence,
};
