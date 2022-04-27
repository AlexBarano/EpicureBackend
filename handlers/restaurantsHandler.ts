import mongoose from "mongoose";

import restaurantSchema from "../models/restaurant";
import DatabaseActionFail from "../errors/DatabaseActionFail";
import { deleteDish } from "./dishesHandler";

export const getRestaurants = async () => {
  const allRestaurants = await restaurantSchema.find({}).populate("chef");
  return allRestaurants;
};

export const getPopularRestaurants = async () => {
  const popularRestaurants = await restaurantSchema
    .find({ isPopular: true })
    .populate("chef");
  return popularRestaurants;
};

export const getRestaurantById = async (id: string) => {
  const exists = await restaurantSchema.exists({ _id: id });
  if (!exists) {
    throw new DatabaseActionFail(`Restaturant with id: ${id} does not exists`);
  }
  const restaturant = await restaurantSchema.findById(id);
  return restaturant;
};

export const deleteRestaurant = async (idToDelete: string) => {
  const exists = await restaurantSchema.exists({ _id: idToDelete });
  if (!exists) {
    throw new DatabaseActionFail(
      `Restaturant with id: ${idToDelete} does not exists`
    );
  }
  const allDishesToDeleteQuery = await restaurantSchema.aggregate([
    {
      $lookup: {
        from: "dishes",
        localField: "_id",
        foreignField: "restaurant",
        as: "dishes",
      },
    },
    { $match: { _id: new mongoose.Types.ObjectId(idToDelete) } },
    {
      $project: {
        _id: 0,
        dishes: 1,
      },
    },
  ]);
  const allDishesToDelete = allDishesToDeleteQuery[0].dishes;

  allDishesToDelete.forEach(async (dish: any) => {
    await deleteDish(dish._id);
  });
  await restaurantSchema.findByIdAndRemove(idToDelete);
};

export const createRestaurant = async (restaurantData: any) => {
  await restaurantSchema.create(restaurantData);
};

export const updateRestaurant = async (restaurantId: string, data: any) => {
  const restaurant = await restaurantSchema.findById(restaurantId);
  if (!restaurant) {
    throw new DatabaseActionFail(
      `Restaturant with id: ${restaurantId} does not exists`
    );
  }
  await restaurantSchema.findByIdAndUpdate(restaurantId, data);
};
