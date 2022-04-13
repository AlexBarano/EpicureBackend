import dishSchema from "../models/dish.js";

export const deleteDish = async (idToDelete) => {
  await dishSchema.findOneAndRemove(idToDelete);
};

// every dish which returns needs to be returned with the restuarant object rather than the id
export const getDishes = async () => {
  //const allDishes = await dishSchema.find({});
  const allDishes = [];
  const aggre = await dishSchema.aggregate([
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurant",
        foreignField: "_id",
        as: "restaurant",
      },
    },
    {
      $unwind: "$restaurant",
    },
  ]);
  return aggre;
};

export const createDish = async (dishData) => {
  await dishSchema.create(dishData);
};

export const updateDish = async (dishId, data) => {
  await dishSchema.updateOne({ id: dishId }, data);
};
