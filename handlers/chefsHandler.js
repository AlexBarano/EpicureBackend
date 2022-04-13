import chefSchema from "../models/chef.js";
import DatabaseActionFail from "../errors/DatabaseActionFail.js";

export const deleteChef = async (idToDelete) => {
  const exists = await chefSchema.exists({ _id: idToDelete });
  if (!exists) {
    throw new DatabaseActionFail();
  }
  await chefSchema.findOneAndRemove({ _id: idToDelete });
};

export const getChefs = async () => {
  const allChefs = await chefSchema.find({});
  return allChefs;
};

export const createChef = async (chefData) => {
  const exists = await chefSchema.exists({ name: chefData.name });
  if (exists) {
    throw new DatabaseActionFail();
  }
  await chefSchema.create(chefData);
};

export const updateChef = async (chefId, data) => {
  const exists = await chefSchema.exists({ _id: chefId });
  if (!exists) {
    throw new DatabaseActionFail();
  }
  await chefSchema.updateOne({ id: chefId }, data);
};
