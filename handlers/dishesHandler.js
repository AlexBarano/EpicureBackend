import dishSchema from "../models/dish.js";
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
  // const allDishes = await dishSchema.aggregate([
  //   {
  //     $lookup: {
  //       from: "restaurants",
  //       localField: "restaurant",
  //       foreignField: "_id",
  //       as: "restaurant",
  //     },
  //   },
  //   {
  //     $unwind: "$restaurant", // this is to unwind the array
  //   },
  // ]);
  // return allDishes;
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
