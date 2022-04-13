import restaurantSchema from "../models/restaurant.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";

export const getRestaurants = async () => {
  const allRestaurants = await restaurantSchema.find({});
  return allRestaurants;
};

export const deleteRestaurant = async (idToDelete) => {
  const exists = await restaurantSchema.exists({ _id: idToDelete });
  if (!exists) {
    throw new DatabaseActionFail();
  }
  await restaurantSchema.findOneAndRemove({ _id: idToDelete });
};

export const createRestaurant = async (restaurantData) => {
  const exists = await restaurantSchema.exists({ name: restaurantData.name });
  if (exists) {
    throw new DatabaseActionFail();
  }
  await restaurantSchema.create(restaurantData);
};

export const updateRestaurant = async (restaurantId, data) => {
  const exists = await restaurantSchema.exists({ _id: restaurantId });
  if (!exists) {
    throw new DatabaseActionFail();
  }
  await restaurantSchema.updateOne({ id: restaurantId }, data);
};
