import chefSchema from "../models/chef.js";

export const deleteChef = async (idToDelete) => {
  await chefSchema.findOneAndRemove(idToDelete);
};

export const getChefs = async () => {
  const allChefs = await chefSchema.find({});
  return allChefs;
};

export const createChef = async (chefData) => {
  await chefSchema.create(chefData);
};

export const updateChef = async (chefId, data) => {
  await chefSchema.updateOne({ id: chefId }, data);
};
