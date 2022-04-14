import * as chefsHandler from "../handlers/chefsHandler.js";
import BadRequestError from "../errors/BadRequestError.js";

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
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid chef id`);
    }
    const chef = await chefsHandler.getChefById(id);
    res.status(200).json({ chef });
  } catch (error) {
    res.status(500).json({ msg: "Error getting chef by its id", error });
  }
};

export const createChef = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    if (!name || !image || !description) {
      throw new BadRequestError(`Please provide valid chef values`);
    }
    await chefsHandler.createChef(name, image, description);
    res.status(201).json({ msg: "Created new chef" });
  } catch (error) {
    res.status(500).json({ msg: "Error creating new chef", error });
  }
};

export const deleteChef = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid chef id`);
    }
    await chefsHandler.deleteChef(id);
    res.status(200).json({ msg: `Deleted chef: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting chef", error });
  }
};

export const updateChef = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;
    if (!name || !image || !description || !id) {
      throw new BadRequestError(`Please provide valid chef values`);
    }
    await chefsHandler.updateChef(id, name, image, description);
    res.status(200).json({ msg: `updated chef: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error updating chef", error });
  }
};
