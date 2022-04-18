import dishSchema from "../models/dish";
import restaurantSchema from "../models/restaurant";
import DatabaseActionFail from "../errors/DatabaseActionFail";

export const deleteDish = async (idToDelete: string) => {
  const exists = await dishSchema.exists({ _id: idToDelete }); // this is O(1) (hash)
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
  const resWithSigDishes = await restaurantSchema
    .find({}, { signatureDish: 1, name: 1 })
    .populate("signatureDish");
  return resWithSigDishes;
};

export const createDish = async (dishData: any) => {
  await dishSchema.create(dishData);
};

export const updateDish = async (dishId: string, data: any) => {
  const exists = await dishSchema.exists({ _id: dishId });
  if (!exists) {
    throw new DatabaseActionFail(`Dish with id: ${dishId} does not exists`);
  }
  await dishSchema.findByIdAndUpdate(dishId, data);
};

export const getDishById = async (dishId: string) => {
  const dish = await dishSchema.findById(dishId).populate("restaurant");
  if (!dish) {
    throw new DatabaseActionFail(`Dish with id: ${dishId} does not exists`);
  }
  return dish;
};
