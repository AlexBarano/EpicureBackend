import restaurantSchema from "../models/restaurant.js";

/*
  ==== fix in these functions: ====
  check if params exists
  search before uploading
  try catch with schema operations
  status codes with good and bad operations 
*/

export const getRestaurants = async (req, res) => {
  const allRestaurants = await restaurantSchema.find({});
  res.status(200).json({ restaurants: allRestaurants });
};

export const createRestaurant = async (req, res) => {
  const parsedData = req.body;
  await restaurantSchema.create(parsedData);
  res.status(201).json({ msg: parsedData });
};

export const deleteRestaurant = async (req, res) => {
  const idToDelete = req.params.id;
  const restaurant = await restaurantSchema.findOneAndRemove(idToDelete);
  res.status(200).json({ msg: `Deleted restaurant: ${restaurant.name}` });
};

export const updateRestaurant = async (req, res) => {
  const idToUpdate = req.params.id;
  await restaurant.updateOne({ id: idToUpdate }, req.body);
  res.status(200).json({ msg: `updated restaurant: ${idToUpdate}` });
};
