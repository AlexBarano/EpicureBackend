import * as chefsHandler from "../handlers/chefsHandler.js";

/*
  ==== fix in these functions: ====
  check if params exists
  ****search before uploading
  ****try catch with schema operations
  ****status codes with good and bad operations 
  ****add handlers here
*/

export const getChefs = async (req, res) => {
  try {
    const allChefs = await chefsHandler.getChefs();
    console.log(allChefs);
    res.status(200).json({ chefs: allChefs });
  } catch (error) {
    res.status(500).json({ msg: "Error getting all the chefs", error });
  }
};

export const getChefById = async (req, res) => {
  try {
    const chefId = req.params.id;
    const chef = await chefsHandler.getChefById(chefId);
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ msg: "Error getting chef by its id", error });
  }
};

export const createChef = async (req, res) => {
  try {
    const parsedData = req.body;
    await chefsHandler.createChef(parsedData);
    res.status(201).json({ msg: parsedData });
  } catch (error) {
    res.status(500).json({ msg: "Error creating new chef", error });
  }
};

export const deleteChef = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    await chefsHandler.deleteChef(idToDelete);
    res.status(200).json({ msg: `Deleted chef: ${idToDelete}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting chef", error });
  }
};

export const updateChef = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    await chefsHandler.updateChef(idToUpdate, req.body);
    res.status(200).json({ msg: `updated chef: ${idToUpdate}` });
  } catch (error) {
    res.status(500).json({ msg: "Error updating chef", error });
  }
};
