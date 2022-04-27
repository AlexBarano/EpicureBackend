import mongoose from "mongoose";

import chefSchema from "../models/chef";
import restaurantSchema from "../models/restaurant";
import DatabaseActionFail from "../errors/DatabaseActionFail";
import { deleteRestaurant } from "./restaurantsHandler";

export const deleteChef = async (idToDelete: string) => {
  const exists = await chefSchema.exists({ _id: idToDelete });
  if (!exists) {
    throw new DatabaseActionFail(`No chef found by id: ${idToDelete}`);
  }

  const allRestaurantsToDeleteQuery = await chefSchema.aggregate([
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "chef",
        as: "restaurants",
      },
    },
    { $match: { _id: new mongoose.Types.ObjectId(idToDelete) } },
    {
      $project: {
        _id: 0,
        restaurants: 1,
      },
    },
  ]);
  const allRestaurantsToDelete = allRestaurantsToDeleteQuery[0].restaurants;
  allRestaurantsToDelete.forEach(async (restaurant: any) => {
    await deleteRestaurant(restaurant._id);
  });

  await chefSchema.findByIdAndRemove(idToDelete);
};

export const getChefs = async () => {
  const allChefs = await chefSchema.aggregate([
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "chef",
        as: "restaurants",
      },
    },
  ]);
  return allChefs;
};

export const getChefById = async (chefId: string) => {
  const exists = await chefSchema.exists({ _id: chefId });
  if (!exists) {
    throw new DatabaseActionFail(`No chef found by id: ${chefId}`);
  }
  const chef = await chefSchema.aggregate([
    {
      $lookup: {
        from: "restaurants",
        localField: "_id",
        foreignField: "chef",
        as: "restaurants",
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chefId),
      },
    },
  ]);
  return chef;
};

export const createChef = async (chefData: any) => {
  if (chefData?.isChefOfTheWeek) {
    await chefSchema.findOneAndUpdate(
      { isChefOfTheWeek: true },
      { isChefOfTheWeek: false }
    );
  }
  await chefSchema.create(chefData);
};

export const updateChef = async (chefId: string, chefData: any) => {
  const chef = await chefSchema.findById(chefId);
  if (!chef) {
    throw new DatabaseActionFail(`Chef with id: ${chefId} does not exists`);
  }
  // check if it changes the isChefOfTheWeek property
  if (chefData?.isChefOfTheWeek) {
    await chefSchema.findOneAndUpdate(
      { isChefOfTheWeek: true },
      { isChefOfTheWeek: false }
    );
  }
  await chefSchema.findByIdAndUpdate(chefId, chefData);
};
export const getChefsRestaurants = async (chefId: string) => {
  const exists = await chefSchema.exists({ _id: chefId });
  if (!exists) {
    throw new DatabaseActionFail(`No chef found by id: ${chefId}`);
  }
  const restaurants = await restaurantSchema.find({ chef: chefId });
  return restaurants;
};

export const getChefOfTheWeek = async () => {
  const chef = await chefSchema.findOne({ isChefOfTheWeek: true });
  return chef;
};
