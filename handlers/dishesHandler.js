import dishSchema from "../models/dish.js";
import restaurantSchema from "../models/restaurant.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";

export const deleteDish = async (idToDelete) => {
  const exists = await dishSchema.exists({ _id: idToDelete }); // thisnis O(1) (hash)
  if (!exists) {
    throw new DatabaseActionFail(`Dish with id: ${idToDelete} does not exists`);
  }
  await dishSchema.findByIdAndRemove(idToDelete);
};

export const getDishes = async () => {
  // this returned all the dishes in the db with the restaurant object
  const allDishes = await dishSchema.find({}).populate("restaurant");
  return allDishes;
};

export const getRestaurantsWithSignatureDishes = async () => {
  // this returned all the dishes in the db with the restaurant object
  const sigDishes = await restaurantSchema.find({}).populate("signatureDish");
  return sigDishes;
};

export const createDish = async (dishData) => {
  await dishSchema.create(dishData);
};

export const updateDish = async (dishId, data) => {
  const exists = await dishSchema.exists({ _id: dishId });
  if (!exists) {
    throw new DatabaseActionFail(`Dish with id: ${dishId} does not exists`);
  }
  await dishSchema.findByIdAndUpdate(dishId, data);
};

export const getDishById = async (dishId) => {
  const dish = await dishSchema.findById(dishId).populate("restaurant");
  if (!dish) {
    throw new DatabaseActionFail(`Dish with id: ${dishId} does not exists`);
  }
  return dish;
};
