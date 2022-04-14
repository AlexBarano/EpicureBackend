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
  const restaurant = await restaurantSchema.findById(restaurantId);
  if (!restaurant) {
    throw new DatabaseActionFail(
      `Restaturant with id: ${restaurantId} does not exists`
    );
  }
  await restaurantSchema.findByIdAndUpdate(restaurantId, {
    ...data,
    isPopular: restaurant.isPopular,
  });
};

export const getPopularRestaurants = async () => {
  const restaurants = await restaurantSchema.find({ isPopular: true });
  return restaurants;
};

export const updatePopularRestaurant = async (restaurantId) => {
  // check if id exist
  const restaurant = await restaurantSchema.findById(restaurantId);
  if (!restaurant) {
    throw new DatabaseActionFail(
      `id: ${restaurantId} does not exists, did not update popular restaurant`
    );
  }
  // find find the new restaturant and update it
  await restaurantSchema.findByIdAndUpdate(restaurantId, {
    isPopular: !restaurant.isPopular,
  });
};

export const getSignatureDish = async (restaurantId) => {
  const restaurant = await restaurantSchema
    .findById(restaurantId)
    .populate("signatureDish");
  if (!restaurant) {
    throw new DatabaseActionFail(`Restaurant doesnt have any siganture dish`);
  }
  return restaurant.signatureDish;
};
