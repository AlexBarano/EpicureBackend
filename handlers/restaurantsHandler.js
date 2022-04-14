import restaurantSchema from "../models/restaurant.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";

export const getRestaurants = async () => {
  const allRestaurants = await restaurantSchema.find({});
  return allRestaurants;
};

export const deleteRestaurant = async (idToDelete) => {
  const exists = await restaurantSchema.exists({ _id: idToDelete });
  if (!exists) {
    throw new DatabaseActionFail(
      `Restaturant with id: ${idToDelete} does not exists`
    );
  }
  await restaurantSchema.findByIdAndRemove(idToDelete);
};

export const createRestaurant = async (restaurantData) => {
  const exists = await restaurantSchema.exists({ name: restaurantData.name });
  if (exists) {
    throw new DatabaseActionFail(
      `Restaturant with the name of: ${restaurantData.name} already exists`
    );
  }
  await restaurantSchema.create(restaurantData);
};

export const updateRestaurant = async (restaurantId, data) => {
  const exists = await restaurantSchema.exists({ _id: restaurantId });
  if (!exists) {
    throw new DatabaseActionFail(
      `Restaturant with id: ${restaurantId} does not exists`
    );
  }
  await restaurantSchema.findByIdAndUpdate(restaurantId, data);
};
export const getPopularRestaurants = async () => {};
