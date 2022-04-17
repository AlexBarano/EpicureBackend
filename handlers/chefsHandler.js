import mongoose from "mongoose";

import chefSchema from "../models/chef.js";
import restaurantSchema from "../models/restaurant.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";
import { deleteRestaurant } from "./restaurantsHandler.js";

export const deleteChef = async (idToDelete) => {
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
  allRestaurantsToDelete.forEach(async (restaurant) => {
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

export const getChefById = async (chefId) => {
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
  if (!chef) {
    throw new DatabaseActionFail(`No chef found by id: ${chefId}`);
  }
  return chef;
};

export const createChef = async (chefData) => {
  const exists = await chefSchema.exists({ name: chefData.name });
  if (exists) {
    throw new DatabaseActionFail(
      `Chef with name: ${chefData.name} already exists`
    );
  }
  await chefSchema.create(chefData);
};

// here we make sure the isChefOfTheWeek does not chage in any way
export const updateChef = async (chefId, chefData) => {
  const chef = await chefSchema.findById(chefId);
  if (!chef) {
    throw new DatabaseActionFail(`Chef with id: ${chefId} does not exists`);
  }
  await chefSchema.findByIdAndUpdate(chefId, {
    ...chefData,
    isChefOfTheWeek: chef.isChefOfTheWeek,
  });
};
export const getChefsRestaurants = async (chefId) => {
  const exists = await chefSchema.exists({ _id: chefId });
  if (!exists) {
    throw new DatabaseActionFail(`No chef found by id: ${chefId}`);
  }
  const restaurants = await restaurantSchema.find({ chef: chefId });
  return restaurants;
};

// export const updateChefOfTheWeek = async (chefId) => {
//   // check if id exist
//   const exists = await chefSchema.exists({ _id: chefId });
//   if (!exists) {
//     throw new DatabaseActionFail(
//       `id: ${chefId} does not exists, did not update chef of the week`
//     );
//   }
//   // find curr chef of the week and update him, if no chef of the week, nothing happends
//   await chefSchema.findOneAndUpdate(
//     { isChefOfTheWeek: true },
//     { isChefOfTheWeek: false }
//   );
//   // find new chef by its id and update him
//   await chefSchema.findByIdAndUpdate(chefId, { isChefOfTheWeek: true });
// };

export const getChefOfTheWeek = async () => {
  const chef = await chefSchema.findOne({ isChefOfTheWeek: true });
  return chef;
};
