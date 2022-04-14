import * as dishesHandler from "../handlers/dishesHandler.js";
import BadRequestError from "../errors/BadRequestError.js";

/*
  ==== fix in these functions: ====
  check if params exists
  ****search before uploading
  ****try catch with schema operations
  ****status codes with good and bad operations 
  ****add handlers here
*/

export const getDishes = async (req, res) => {
  try {
    const allDishes = await dishesHandler.getDishes();
    res.status(200).json({ dishes: allDishes });
  } catch (error) {
    res.status(500).json({ msg: "Error getting all the dishes", error });
  }
};

export const createDish = async (req, res) => {
  try {
    const parsedData = req.body;
    await dishesHandler.createDish(parsedData);
    res.status(201).json({ msg: parsedData });
  } catch (error) {
    res.status(500).json({ msg: "Error creating new dish", error });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid dish id`);
    }
    await dishesHandler.deleteDish(id);
    res.status(200).json({ msg: `Deleted dish: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting dish", error });
  }
};

export const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError(`Please provide valid dish id`);
    }
    await dishesHandler.updateDish(id, req.body);
    res.status(200).json({ msg: `updated dish: ${id}` });
  } catch (error) {
    res.status(500).json({ msg: "Error updating dish", error });
  }
};

export const getDishById = async (req, res) => {
  try {
    const idOfDish = req.params.id;
    const dish = await dishesHandler.getDishById(idOfDish);
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ msg: "Error getting dish", error });
  }
};
