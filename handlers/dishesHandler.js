import dishSchema from "../models/dish.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";

export const deleteDish = async (idToDelete) => {
  const exists = await dishSchema.exists({ _id: idToDelete });
  if (!exists) {
    throw new DatabaseActionFail();
  }
  await dishSchema.findOneAndRemove({ _id: idToDelete });
};

export const getDishes = async () => {
  // this returned all the dishes in the db with the restaurant object
  const allDishes = await dishSchema.aggregate([
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurant",
        foreignField: "_id",
        as: "restaurant",
      },
    },
    {
      $unwind: "$restaurant", // this is to unwind the array
    },
  ]);
  return allDishes;
};

export const createDish = async (dishData) => {
  const exists = await dishSchema.exists({ name: dishData.name });
  if (exists) {
    throw new DatabaseActionFail();
  }
  await dishSchema.create(dishData);
};

export const updateDish = async (dishId, data) => {
  const exists = await dishSchema.exists({ _id: dishId });
  if (!exists) {
    throw new DatabaseActionFail();
  }
  await dishSchema.updateOne({ id: dishId }, data);
};
