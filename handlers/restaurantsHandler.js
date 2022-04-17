import mongoose from "mongoose";

import restaurantSchema from "../models/restaurant.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";
import { deleteDish } from "./dishesHandler.js";

export const getRestaurants = async () => {
  const allRestaurants = await restaurantSchema.find({});
  return allRestaurants;
};

export const getRestaurantById = async (id) => {
  const restaturant = await restaurantSchema.findById(id);
  return restaturant;
};

export const deleteRestaurant = async (idToDelete) => {
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

  allDishesToDelete.forEach(async (dish) => {
    await deleteDish(dish._id);
  });
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

// export const getPopularRestaurants = async () => {
//   const restaurants = await restaurantSchema.find({ isPopular: true });
//   return restaurants;
// };

// export const updatePopularRestaurant = async (restaurantId) => {
//   // check if id exist
//   const restaurant = await restaurantSchema.findById(restaurantId);
//   if (!restaurant) {
//     throw new DatabaseActionFail(
//       `id: ${restaurantId} does not exists, did not update popular restaurant`
//     );
//   }
//   // find find the new restaturant and update it
//   await restaurantSchema.findByIdAndUpdate(restaurantId, {
//     isPopular: !restaurant.isPopular,
//   });
// };

// export const getSignatureDish = async (restaurantId) => {
//   const restaurant = await restaurantSchema
//     .findById(restaurantId)
//     .populate("signatureDish");
//   if (!restaurant) {
//     throw new DatabaseActionFail(`Error getting signature dish`);
//   }
//   return restaurant.signatureDish;
// };

// export const getRestaurantsOfChefId = async (chefId) => {
//   const restaurants = await restaurantSchema.find({
//     chef: new mongoose.Types.ObjectId(chefId),
//   });
//   if (!restaurants) {
//     throw new DatabaseActionFail(`Error getting chef's: ${chefId} restaurants`);
//   }
//   console.log(restaurants);
//   return restaurants;
// };

// export const getAllSignatureDishes = async () => {
//   const restaurants = await getRestaurants();
//   const allSigDishes = restaurants.forEach(async (restaurant) => {
//     const sigDish = await getSignatureDish(restaurant._id);
//     return sigDish;
//   });
//   console.log(allSigDishes);
//   return allSigDishes;
// };
