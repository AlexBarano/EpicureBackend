import chefSchema from "../models/chef.js";

/*
  ==== fix in these functions: ====
  check if params exists
  search before uploading
  try catch with schema operations
  status codes with good and bad operations 
*/
export const getChefs = async (req, res) => {
  const allChefs = await chefSchema.find({});
  res.status(200).json({ chefs: allChefs });
};

export const createChef = async (req, res) => {
  const parsedData = req.body;
  await chefSchema.create(parsedData);
  res.status(201).json({ msg: parsedData });
};

export const deleteChef = async (req, res) => {
  const idToDelete = req.params.id;
  const chef = await chefSchema.findOneAndRemove(idToDelete);
  res.status(200).json({ msg: `Deleted chef: ${chef.name}` });
};

export const updateChef = async (req, res) => {
  const idToUpdate = req.params.id;
  await chefSchema.updateOne({ id: idToUpdate }, req.body);
  res.status(200).json({ msg: `updated chef: ${idToUpdate}` });
};
