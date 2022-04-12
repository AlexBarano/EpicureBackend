import dishSchema from "../models/dish.js";

export const deleteDish = async (idToDelete) => {
  await dishSchema.findOneAndRemove(idToDelete);
};

export const getDishes = async () => {
  const allDishes = await dishSchema.find({});
  return allDishes;
};

export const createDish = async (dishData) => {
  await dishSchema.create(dishData);
};

export const updateDish = async (dishId, data) => {
  await dishSchema.updateOne({ id: dishId }, data);
};
