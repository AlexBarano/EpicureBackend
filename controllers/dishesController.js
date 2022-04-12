import dishSchema from "../models/dish.js";

/*
  ==== fix in these functions: ====
  check if params exists
  search before uploading
  try catch with schema operations
  status codes with good and bad operations 
*/

export const getDishes = async (req, res) => {
  const allDishes = await dishSchema.find({});
  res.status(200).json({ dishes: allDishes });
};

export const createDish = async (req, res) => {
  const parsedData = req.body;
  await dishSchema.create(parsedData);
  res.status(201).json({ msg: parsedData });
};

export const deleteDish = async (req, res) => {
  const idToDelete = req.params.id;
  const dish = await chefSchema.findOneAndRemove(idToDelete);
  res.status(200).json({ msg: `Deleted dish: ${dish.name}` });
};

export const updateDish = async (req, res) => {
  const idToUpdate = req.params.id;
  await dishSchema.updateOne({ id: idToUpdate }, req.body);
  res.status(200).json({ msg: `updated dish: ${idToUpdate}` });
};
