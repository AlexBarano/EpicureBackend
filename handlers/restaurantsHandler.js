import restaurantSchema from "../models/restaurant.js";

export const deleteRestaurant = async (idToDelete) => {
  await restaurantSchema.findOneAndRemove(idToDelete);
};

export const getRestaurants = async () => {
  const allRestaurants = await restaurantSchema.find({});
  return allRestaurants;
};

export const createRestaurant = async (restaurantData) => {
  await restaurantSchema.create(restaurantData);
};

export const updateRestaurant = async (restaurantId, data) => {
  await restaurantSchema.updateOne({ id: restaurantId }, data);
};
