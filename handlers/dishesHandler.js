import dishSchema from "../models/dish.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";
import mongoose from "mongoose";

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
  await dishSchema.create(dishData);
};

export const updateDish = async (dishId, data) => {
  const exists = await dishSchema.exists({ _id: dishId });
  if (!exists) {
    throw new DatabaseActionFail();
  }
  await dishSchema.updateOne({ id: dishId }, data);
};

export const getDishById = async (dishId) => {
  // const dish = await dishSchema.findOne({ _id: dishId });
  // if (!dish) {
  //   throw new DatabaseActionFail();
  // }
  // return dish;

  const dish = await dishSchema.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(dishId),
      },
    },
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
  // if (!dish) {
  //   throw new DatabaseActionFail();
  // }
  return dish;
};
