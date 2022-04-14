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
  const allChefs = await chefSchema.find({});
  return allChefs;
};

export const getChefById = async (chefId) => {
  const chef = await chefSchema.findOne({ _id: chefId });
  if (!chef) {
    throw new DatabaseActionFail(`No chef found by id: ${chefId}`);
  }
  return chef;
};

export const createChef = async (name, image, description) => {
  const exists = await chefSchema.exists({ name });
  if (exists) {
    throw new DatabaseActionFail(`Chef with id: ${name} already exists`);
  }
  await chefSchema.create(name, image, description);
};

export const updateChef = async (chefId, name, image, description) => {
  const exists = await chefSchema.exists({ _id: chefId });
  if (!exists) {
    throw new DatabaseActionFail(`Chef with id: ${chefId} does not exists`);
  }
  await chefSchema.updateOne({ id: chefId }, { name, image, description });
};
