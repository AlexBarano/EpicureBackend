import mongoose from "mongoose";
import chefSchema from "../models/chef.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";

export const deleteChef = async (idToDelete) => {
  const exists = await chefSchema.exists({ _id: idToDelete });
  if (!exists) {
    throw new DatabaseActionFail(`No chef found by id: ${idToDelete}`);
  }
  await chefSchema.findOneAndRemove({ _id: idToDelete });
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
      `Chef with id: ${chefData.name} already exists`
    );
  }
  await chefSchema.create(chefData);
};

export const updateChef = async (chefId, chefData) => {
  const exists = await chefSchema.exists({ _id: chefId });
  if (!exists) {
    throw new DatabaseActionFail(`Chef with id: ${chefId} does not exists`);
  }
  await chefSchema.updateOne({ id: chefId }, chefData);
};
